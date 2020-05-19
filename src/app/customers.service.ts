import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Customer } from "../../api/models/Customer";
import { BehaviorSubject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()
export class CustomersService {
  private API_URL = 'http://localhost:4001/pages/customer';
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
  getAllIssues()  {
    return this.httpClient.get<Customer[]>(this.API_URL)
  }

  getAllCust() {
   return  this.httpClient.get<Customer[]>(this.API_URL)
  }
  getAllCustomersById(id){
    return this
            .httpClient
            .get(`${this.API_URL}/details/${id}`);
    }

  // DEMO ONLY, you can find working methods below
   addCustomer(FirstName, LastName, Country, Address, Company, Email, Phone, Mobile, Website) {
    const obj = {
    FirstName,
	LastName,
	Country,
	Address,
	Company,
	Email,
	Phone,
	Mobile,
	Website
    };
	//console.log(obj);
    this.httpClient
      .post(`${this.API_URL}/add`, obj)
      .subscribe(res => console.log("Done"));
      this.dialogData = obj;
  }


     editProduct(id) {
      return this
            .httpClient
            .get(`${this.API_URL}`);

    }
  editCustomer(FirstName, LastName, Country, Address, Company, Email, Phone, Mobile, Website, id) {
   // this.dialogData = status;
     const obj = {
      FirstName,
	LastName,
	Country,
	Address,
	Company,
	Email,
	Phone,
	Mobile,
	Website
    };
    this
      .httpClient
      .post(`${this.API_URL}/update/${id}`, obj)
      .subscribe(res => console.log(id));
	   this.dialogData = obj;
  }



  deleteCustomer (id, FirstName,LastName) {
    console.log(id);
 return  this.httpClient.get(`${this.API_URL}/delete/${id}`);

  }
}

