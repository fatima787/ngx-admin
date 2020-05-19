import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from './../../api/models/product';
import {Customer} from './../../api/models/Customer';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ProductService {
  private readonly API_URL = 'http://localhost:4001/pages/contract/products';

  dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Customer[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllProduct(): Observable<any>  {
   return  this.httpClient.get<Customer[]>(this.API_URL)
    }

    getAllProductsById(id){
    return this
            .httpClient
            .get(`http://localhost:4001/pages/contract/products/details/${id}`);
    }


  // DEMO ONLY, you can find working methods below
   addPro(custid,ProductName,Price,Quantity,status,start,end,priceterm, term, totalprice,reminddate,type) {
    const obj = {
    ProductName,
	Quantity,
	Price,
  status,
  start,
  end,
  priceterm,
   term,
   totalprice,
   reminddate,
   type,
    };
	//console.log(obj);
    this.httpClient
      .post(`${this.API_URL}/add/${custid}`, obj)
      .subscribe(res => console.log("Done"));
      this.dialogData = obj;
  }

       editP(id) {
      return this
            .httpClient
            .get(`${this.API_URL}`);
	   }

  editPro(ProductName,Price,Quantity,status,startdate,enddate,priceterm,term,totalprice,start, end,  id) {
   // this.dialogData = status;
     const obj = {
    ProductName,
	Quantity,
	Price,
  status,
  startdate,
  enddate,
  priceterm,
  term,
  totalprice,
  start,
  end,
    };
    this
      .httpClient
      .post(`${this.API_URL}/update/${id}`, obj)
      .subscribe(res => console.log(id));
	   this.dialogData = obj;
  }



  deletePro (id, ProductName) {
    console.log('contractid' +id);
 return  this.httpClient.get(`${this.API_URL}/delete/${id}`);
   // console.log(id);
  }
}
