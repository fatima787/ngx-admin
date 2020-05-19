import {Component, OnInit, ViewChild, Inject,ChangeDetectorRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Customer} from '../../../../../api/models/Customer';
import { CustomersService } from '../../../customers.service';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import {ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import {CustomerEditComponent} from './../customer-edit/customer-edit.component';
import {BehaviorSubject, fromEvent, merge} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatDialog} from '@angular/material/dialog';
import {CustomerDeleteComponent} from './../customer-delete/customer-delete.component';
import {CustomerAddComponent} from './../customer-add/customer-add.component';
import { ActivatedRoute, Router } from '@angular/router';


import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'] ,
})
export class TableComponent implements OnInit  {
 displayedColumns = ['FirstName','Company', 'Email', 'Phone', 'actions'];
  exampleDatabase: CustomersService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
 customer: any = {};
 cust;
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: CustomersService, private route: ActivatedRoute,
              private router: Router, private translate: TranslateService,
              private changeDetectorRefs: ChangeDetectorRef) {
translate.setDefaultLang('en');
}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  refresh() {
    this.dataService.getAllIssues().subscribe( data =>  {
      this.cust = data;
      this.changeDetectorRefs.detectChanges();
    });
  }

  ngOnInit() {
  this.loadData();
this.dataService.getAllIssues().subscribe( data =>  {
this.cust = data;
});
  }

  addNew(FirstName, LastName, Country, Address, Company, Email, Phone, Mobile, Website) {
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      data: {FirstName, LastName, Country, Address, Company, Email, Phone, Mobile, Website },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refresh();
      }
    });
  }

  EditCustomer(FirstName, LastName, Country, Address, Company, Email, Phone, Mobile, Website, id) {
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      data: { FirstName, LastName, Country, Address, Company, Email, Phone, Mobile, Website, id},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refresh();
      }
    });
  }

  deleteItem(id, FirstName, LastName) {
   // this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(CustomerDeleteComponent, {
      data: {id, FirstName, LastName},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
this.dataService.deleteCustomer(id, FirstName, LastName).subscribe(res => {
 this.exampleDatabase.dataChange.value.splice(id, 1);

              });
        this.refresh();
     // tslint:disable-next-line: comment-format
     }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    this.exampleDatabase = new CustomersService(this.httpClient);
    // tslint:disable-next-line: no-use-before-declare
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
        // tslint:disable-next-line: no-console
        console.log(this.dataSource);
      });
  }
}

export class ExampleDataSource extends DataSource<Customer> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Customer[] = [];
  renderedData: Customer[] = [];

  constructor(public _exampleDatabase: CustomersService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Customer[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((customer: Customer) => {
    const searchStr = (customer.FirstName + customer.LastName + customer.Country +
      customer.Address + customer.Company + customer.Email + customer.Phone +
      customer.Mobile + customer.Website).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        })

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Customer[]): Customer[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
case 'FirstName': [propertyA, propertyB] = [a.FirstName, b.FirstName]; break;
case 'LastName': [propertyA, propertyB] = [a.LastName, b.LastName]; break;
case 'Country': [propertyA, propertyB] = [a.Country, b.Country]; break;
case 'Address': [propertyA, propertyB] = [a.Address, b.Address]; break;
case 'Company': [propertyA, propertyB] = [a.Company, b.Company]; break;
case 'Email': [propertyA, propertyB] = [a.Email, b.Email]; break;
case 'Phone': [propertyA, propertyB] = [a.Phone, b.Phone]; break;
case 'Mobile': [propertyA, propertyB] = [a.Mobile, b.Mobile]; break;
case 'Website': [propertyA, propertyB] = [a.Website, b.Website]; break;

      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
