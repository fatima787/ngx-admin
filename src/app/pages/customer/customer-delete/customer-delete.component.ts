import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {CustomersService} from '../../../customers.service';
@Component({
  selector: 'ngx-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.scss']
})
export class CustomerDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomerDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: CustomersService) { }

onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log(this.data);
   this.dataService.deleteCustomer(this.data.id, this.data.FirstName,this.data.LastName);
  }

  ngOnInit() {
  }

}
