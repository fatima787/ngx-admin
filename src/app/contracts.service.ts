import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Contract} from './../../api/models/Contract';
import {Customer} from './../../api/models/Customer';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ContractsService {
  private readonly API_URL = 'http://localhost:4001/pages/contract/services';

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
  getAllContract(): Observable<any>  {
   return  this.httpClient.get<Customer[]>(this.API_URL);
  }

    getAllServicesById(id){
    return this
            .httpClient
            .get(`http://localhost:4001/pages/contract/services/details/${id}`);
    }

  // DEMO ONLY, you can find working methods below
   addContract( custid , ContractName,start, end, status, price, term, totalprice,type,ContractDescription) {
    const obj = {
   ContractName,
   start,
   status,
   end,
   price,
   term,
   totalprice,
   type,
   ContractDescription,
    };

    this.httpClient
      .post(`${this.API_URL}/add/${custid}`, obj)
      // tslint:disable-next-line: no-console
      .subscribe(res => console.log("Done"));
      this.dialogData = obj;
  }


     editProduct(id) {
      return this
            .httpClient
            .get(`${this.API_URL}`);

    }
  editContract ( ContractName,price, term, status, totalprice, start, end, ContractDescription, id) {
   // this.dialogData = status;
     const obj = {
      ContractName,
      price,
      term,
      status,
      start,
      end,
      totalprice,
      ContractDescription,
    };
    this
      .httpClient
      .post(`${this.API_URL}/update/${id}`, obj)
      .subscribe(res => console.log(id));
	   this.dialogData = obj;
  }



  contDelete (id, ContractName) {
 return  this.httpClient.get(`${this.API_URL}/delete/${id}`);
  }
}






