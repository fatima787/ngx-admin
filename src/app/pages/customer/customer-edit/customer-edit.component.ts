import { Component, OnInit } from '@angular/core';
import {  Validators } from '@angular/forms';
import { CustomersService } from '../../../customers.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ngx-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent  {
 constructor(public dialogRef: MatDialogRef<CustomerEditComponent>,
@Inject(MAT_DIALOG_DATA) public data: any, public dataService: CustomersService) { }

formControl = new FormControl('', [
  Validators.required,
  // Validators.email,
]);

getErrorMessage() {
  return this.formControl.hasError('required') ? 'Required field' :
    this.formControl.hasError('email') ? 'Not a valid email' :
      '';
}

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.editCustomer(this.data.FirstName, this.data.LastName, this.data.Country,
      this.data.Address, this.data.Company, this.data.Email, this.data.Phone,
      this.data.Mobile, this.data.Website, this.data.id);
  }
}
