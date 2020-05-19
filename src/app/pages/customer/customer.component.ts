import { EchartsMultipleXaxisComponent } from './../charts/echarts/echarts-multiple-xaxis.component';
import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],

})
@Directive({
  selector: '[mdbModal]',
  exportAs: ' mdbModal ' ,
})

// tslint:disable-next-line: directive-class-suffix
export class CustomerComponent implements OnInit {
  validatingForm: FormGroup;
  constructor() { }
  ngOnInit() {
    this.validatingForm = new FormGroup({
    required: new FormControl(null, Validators.required) ,
    });
  }
}
