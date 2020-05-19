import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CustomersService } from '../../../customers.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Customer} from '../../../../../api/models/Customer';
@Component({
  selector: 'ngx-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent{

  constructor(public dialogRef: MatDialogRef<CustomerAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Customer,
              public dataService: CustomersService) { }

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

  public confirmAdd(): void {
    this.dataService.addCustomer(this.data.FirstName, this.data.LastName, this.data.Country,
      this.data.Address, this.data.Company, this.data.Email, this.data.Phone, this.data.Mobile, this.data.Website );
  }
}
