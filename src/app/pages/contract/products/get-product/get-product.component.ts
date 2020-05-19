import { Component, OnInit,  ChangeDetectorRef } from '@angular/core';

import { ElementRef, ViewChild} from '@angular/core';
import {ProductService} from './../../../../product.service';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Product} from './../../../../../../api/models/product';
import {DataSource} from '@angular/cdk/collections';
import {AddProductComponent} from './../add-product/add-product.component';
import {EditProductComponent} from './../edit-product/edit-product.component';
import {DeleteProductComponent} from './../delete-product/delete-product.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'ngx-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.scss']
})
export class GetProductComponent implements OnInit {

  displayedColumns = ['FirstName','procontracts.ProductName','procontracts.Quantity','procontracts.Price',
  'procontracts.status','procontracts.start','procontracts.end','actions'];
  exampleDatabase: ProductService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  product: any = {};
   productt: any;
   statusess: any;
   remindd;
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public proService: ProductService, private route: ActivatedRoute, private router: Router,
              private changeDetectorRefs: ChangeDetectorRef) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
	this.route.params.subscribe(params => {
      this.proService.editP(params["id"]).subscribe(res => {
        this.product = res;
      });
    });
    this.proService.getAllProduct().subscribe( data  => {
      this.productt = data.products,
      this.statusess= data.statuses,
     this.remindd = data.remind,
    console.log(this.remindd);
    });

  }

  refresh() {
    this.proService.getAllProduct().subscribe( data  => {
      this.productt = data.products,
      this.statusess= data.statuses,
     this.remindd = data.remind,
     this.changeDetectorRefs.detectChanges();
    });
  }

  addProduct(ProductName,Price,Quantity,status,priceterm, term, totalprice, type) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {ProductName,Price,Quantity,status,priceterm, term, totalprice, type}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refresh();
      }
    });
  }

  editProdu(FirstName,ProductName,Price,Quantity,status,startdate,enddate,priceterm, term, totalprice,start,end, id) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: {FirstName,ProductName,Price,Quantity,status,startdate,enddate,priceterm, term, totalprice,start,end, id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
	this.router.navigate(['/pages/contract/products']);
        this.refresh();
      }
    });
  }



  deleteProduct(id, ProductName) {
   // this.index = i;
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: {id, ProductName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

	        this.proService.deletePro(id,ProductName).subscribe(res => {
            this.exampleDatabase.dataChange.value.splice(id, 1);

              });
        this.refresh();
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
    this.exampleDatabase = new ProductService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Product> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Product[] = [];
  renderedData: Product[] = [];

  constructor(public _exampleDatabase: ProductService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Product[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((product: Product) => {
          const searchStr = (product.ProductName + product.Quantity + product.Price).toLowerCase();
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
  sortData(data: Product[]): Product[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'ProductName': [propertyA, propertyB] = [a.ProductName, b.ProductName]; break;
		case 'Quantity': [propertyA, propertyB] = [a.Quantity, b.Quantity]; break;
		case 'Price': [propertyA, propertyB] = [a.Price, b.Price]; break;

      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
