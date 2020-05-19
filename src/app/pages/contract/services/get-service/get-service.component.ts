import { Component, OnInit, ViewChild,  ChangeDetectorRef } from '@angular/core';
import { ElementRef} from '@angular/core';
import {ContractsService} from './../../../../contracts.service';
import {CustomersService} from './../../../../customers.service';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Contract} from './../../../../../../api/models/Contract';
import {Customer} from './../../../../../../api/models/Customer';
import {DataSource} from '@angular/cdk/collections';
import {AddServiceComponent} from './../add-service/add-service.component';
import {EditServiceComponent} from './../edit-service/edit-service.component';
import {DeleteServiceComponent} from './../delete-service/delete-service.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'ngx-get-service',
  templateUrl: './get-service.component.html',
  styleUrls: ['./get-service.component.scss']
})
export class GetServiceComponent implements OnInit {
 displayedColumns = ['FirstName','contracts.ContractName','contracts.status','contracts.start',
 'contracts.end','actions'];
 theBest = ['FirstName'];
  exampleDatabase: ContractsService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
 contract: any = {};
 public customer;
public statuse;
public remindd;
 isLoading = false;
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public contractService: ContractsService, private route: ActivatedRoute, private router: Router,
              private changeDetectorRefs: ChangeDetectorRef) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  refresh() {
    this.contractService.getAllContract().subscribe( data  => {
      this.statuse = data.statuses;
     this.customer = data.customers;
     this.remindd = data.remind;
     this.changeDetectorRefs.detectChanges();
    });
  }

  ngOnInit() {
    this.isLoading =  true;
    this.loadData();
	  this.route.params.subscribe(params => {
    this.contractService.editProduct(params['id']).subscribe(res => {
    this.contract = res;
      });
    });

    this.contractService.getAllContract().subscribe( data  => {
      this.statuse = data.statuses;
     this.customer = data.customers;
     this.remindd = data.remind;
    console.log(this.statuse);

    });

  }


  contNew( ContractName, status, price, term, totalprice, type, ContractDescription) {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      data: { ContractName, status, price, term, totalprice, type,ContractDescription },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
     //   this.dataService.addNew(name);
        this.refresh();
      }
    });
  }
  contEdit(FirstName,ContractName, price, term, status, totalprice, ContractDescription,start,end, id) {
    const dialogRef = this.dialog.open(EditServiceComponent, {
      data: { FirstName,ContractName, price, term, status, totalprice, ContractDescription,start,end,  id}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
		 this.router.navigate(['/pages/contract/services']);
        this.refresh();
      }
    });
  }
  contDelete(id, ContractName) {
    this.id = id;
    const dialogRef = this.dialog.open(DeleteServiceComponent, {
      data: {id, ContractName}
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
	      this.contractService.contDelete(id,ContractName).subscribe(res => {
        this.exampleDatabase.dataChange.value.splice(id, 1);
              });
        this.refresh();
     }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    this.exampleDatabase = new ContractsService(this.httpClient);
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
       // console.log(this.dataSource);
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

  constructor(public _exampleDatabase: ContractsService,
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
      this._paginator.page
    ];


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((cust: Customer) => {
          const searchStr = (cust.FirstName + cust.LastName ).toLowerCase();
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
/* 		case 'startdate': [propertyA, propertyB] = [a.startdate, b.startdate]; break;
		case 'enddate': [propertyA, propertyB] = [a.enddate, b.enddate]; break;
		case 'ContractDescription': [propertyA, propertyB] = [a.ContractDescription, b.ContractDescription]; break; */

      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
