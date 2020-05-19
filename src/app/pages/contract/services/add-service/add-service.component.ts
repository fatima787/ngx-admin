import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {ContractsService} from '../../../../contracts.service';
import {CustomersService} from '../../../../customers.service';
import {FormControl, Validators} from '@angular/forms';
import {Contract} from '../../../../../../api/models/Contract';
import { MatDialog } from '@angular/material/dialog';
import {CustomerAddComponent} from './../../../customer/customer-add/customer-add.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import moment = require('moment');
import { LOCALE_ID } from '@angular/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { DatePipe } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'ngx-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } ,
   { provide: LOCALE_ID, useValue: 'en-GB' }
  ],
})
export class AddServiceComponent implements OnInit {
  public cust;
  selectedLevel;
  date;
  start = new Date();
  end = new Date();
  @Input() startDateLabel: string;
  @Input() endDateLabel: string;

  @Input() startDateInput;
  @Input() endDateInput;

  @ViewChild('startDateToggle', { static: false }) startDate;
  @ViewChild('endDateToggle', { static: false }) endDate;

  step = 1;
  inputValue;
  @Output() StartEndDatesOutput = new EventEmitter();
  startEndDatesForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddServiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Contract,
              public contractService: ContractsService, public dialog: MatDialog,private fb: FormBuilder,
              public contser: CustomersService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.startEndDatesForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      months: [0],
      days: [0],
      years: [0],
    });
    this.startEndDatesForm.controls['startDate'].setValue(this.startDateInput);
    this.startEndDatesForm.controls['months'].setValue(0);
    this.startEndDatesForm.controls['days'].setValue(0);
    if (this.startEndDatesForm.controls['startDate'].value) {
      if (this.endDateInput) {
        this.startEndDatesForm.controls['endDate'].setValue(this.endDateInput);
        this.endDateClicked();
      }
    }

    this.contser.getAllCust().subscribe( data  => {
     this.cust = data;
    console.log(this.cust);

    });
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  newCustomer(FirstName, LastName, Country, Address, Company, Email, Phone, Mobile, Website) {
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      data: {FirstName, LastName, Country, Address, Company, Email, Phone, Mobile, Website }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
     //   this.dataService.addNew(name);
      }
    });
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  selected(){
    console.log(this.selectedLevel._id)
  }

  startDateClicked() {
    this.StartEndDatesOutput.emit(this.getDates());
    console.log( this.startEndDatesForm.controls['startDate'].value);
  }

  endDateClicked() {
    if (this.startEndDatesForm.controls['startDate'].value) {
      const eventStartTime = new Date(this.startEndDatesForm.controls['startDate'].value);
      const eventEndTime = new Date(this.startEndDatesForm.controls['endDate'].value);

      const m = moment(eventEndTime);
      const years = m.diff(eventStartTime, 'years');
      m.add(-years, 'years');
      const months = m.diff(eventStartTime, 'months');
      m.add(-months, 'months');
      const days = m.diff(eventStartTime, 'days');

      this.startEndDatesForm.controls['months'].setValue(months);
      this.startEndDatesForm.controls['years'].setValue(years);
      this.startEndDatesForm.controls['days'].setValue(days);
      this.StartEndDatesOutput.emit(this.getDates());
    } else {
      // tslint:disable-next-line: no-console
      console.log('Please select the start date');
      this.startEndDatesForm.controls['endDate'].setValue('');
    }
  }


  monthsUp() {
    if (this.startEndDatesForm.controls['startDate'].value) {
      if (this.startEndDatesForm.controls['months'].value >= 0) {
        this.startEndDatesForm.controls['months'].setValue(this.startEndDatesForm.controls['months'].value + this.step);
        this.setEndDate();
      }
    } else {
      // tslint:disable-next-line: no-console
      console.log('Please select the start date');
    }
  }

  yearsUp() {
    if (this.startEndDatesForm.controls['startDate'].value) {
      if (this.startEndDatesForm.controls['years'].value >= 0) {
        this.startEndDatesForm.controls['years'].setValue(this.startEndDatesForm.controls['years'].value + this.step);
        this.setEndDate();
      }
    } else {
      // tslint:disable-next-line: no-console
      console.log('Please select the start date');
    }
  }

  monthsDown() {
    if (this.startEndDatesForm.controls['startDate'].value) {
      if (this.startEndDatesForm.controls['months'].value >= 1) {
        this.startEndDatesForm.controls['months'].setValue(this.startEndDatesForm.controls['months'].value - this.step);
        this.setEndDate();
      }
    } else {
      // tslint:disable-next-line: no-console
      console.log('Please select the start date');
    }
  }

  yearsDown() {
    if (this.startEndDatesForm.controls['startDate'].value) {
      if (this.startEndDatesForm.controls['years'].value >= 1) {
        this.startEndDatesForm.controls['years'].setValue(this.startEndDatesForm.controls['years'].value - this.step);
        this.setEndDate();
      }
    } else {
      // tslint:disable-next-line: no-console
      console.log('Please select the start date');
    }
  }

  setEndDate() {
    this.startEndDatesForm.controls['endDate'].setValue(moment
    (new Date(this.startEndDatesForm.controls['startDate'].value))
      .add(this.startEndDatesForm.controls['days'].value, 'days')
      .add(this.startEndDatesForm.controls['months'].value, 'months')
      .add(this.startEndDatesForm.controls['years'].value, 'years')
      .local().format());

    this.StartEndDatesOutput.emit(this.getDates());
    console.log(this.StartEndDatesOutput.emit(this.getDates()));
  }

  getDates() {
    const startEndDates = {
      'startDate': this.startEndDatesForm.controls['startDate'].value,
      'endDate': this.startEndDatesForm.controls['endDate'].value,
    };
    console.log(startEndDates)
    return startEndDates;
  }

  convert(str) {
    const date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  public confirmAdd(): void {
    this.start =this.startEndDatesForm.controls['startDate'].value.toISOString();
    this.end = this.startEndDatesForm.controls['endDate'].value,
    this.contractService.addContract(this.selectedLevel._id , this.data.ContractName ,
      this.start , this.end,  this.data.status,
     this.data.price, this.data.term, this.data.totalprice, this.data.type, this.data.ContractDescription);
     // tslint:disable-next-line: no-console
     console.log(this.start );
  }
  onClick(){
    console.log(this.startDate);
  }
}
