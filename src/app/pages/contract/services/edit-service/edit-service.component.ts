import { Component, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {ContractsService} from '../../../../contracts.service';
import {FormControl, Validators} from '@angular/forms';

import { Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import moment = require('moment');

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
  selector: 'ngx-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditServiceComponent implements OnInit{
  start = new Date();
  end = new Date();
  @Input() startDateLabel: string;
  @Input() endDateLabel: string;

  @Input() startDateInput;
  @Input() endDateInput;

  @ViewChild('startDateToggle', { static: false }) startDate;
  @ViewChild('endDateToggle', { static: false }) endDate;

  step = 1;

  @Output() StartEndDatesOutput = new EventEmitter();
  startEndDatesForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<EditServiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public contractService: ContractsService,
              private fb: FormBuilder) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
ngOnInit(){
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
}
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
    console.log(this.data.id);
    this.start =this.startEndDatesForm.controls['startDate'].value;
    this.end = this.startEndDatesForm.controls['endDate'].value,
    this.contractService.editContract(this.data.ContractName,this.data.price, this.data.term,
      this.data.status,this.data.totalprice, this.start, this.end, this.data.ContractDescription,this.data.id);
  }
  startDateClicked() {
    this.StartEndDatesOutput.emit(this.getDates());
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

}
