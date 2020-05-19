import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomersService } from '../../customers.service';
import { CustomerComponent } from './customer.component';
import { TableComponent } from './table/table.component';

// MDB
import { ModalModule } from 'angular-bootstrap-md';
import { WavesModule } from 'angular-bootstrap-md';
import { InputsModule } from 'angular-bootstrap-md';
import { ButtonsModule } from 'angular-bootstrap-md';
import { InputUtilitiesModule } from 'angular-bootstrap-md';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { IconsModule } from 'angular-bootstrap-md';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
// tslint:disable-next-line: max-line-length
import { MatCardModule } from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { CustomerAddComponent } from './customer-add/customer-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import {  MatDialogRef } from '@angular/material/dialog';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CollapseModule } from 'angular-bootstrap-md';
import { TableModule } from 'angular-bootstrap-md';


const COMPONENTS = [
  CustomerComponent,
  TableComponent,

];
const MODULES = [
  ThemeModule,
  ModalModule.forRoot(),
  CustomerRoutingModule,

  WavesModule.forRoot(),
  InputsModule.forRoot(),
  ButtonsModule,
  MDBBootstrapModule.forRoot(),
  InputUtilitiesModule,
  ReactiveFormsModule,
  SlimLoadingBarModule,
  MatFormFieldModule,
  MatTableModule,
  DragDropModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  IconsModule,
  MatDialogModule,
  FormsModule,
  TableModule,
  MatButtonModule,
  MatIconModule,
  MatSortModule,
  CommonModule,
  CollapseModule,
  MatToolbarModule,
  MatCardModule,
  MatTooltipModule,
  MatCheckboxModule,
];
const SERVICES = [
];
@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  TableComponent,
  CustomerAddComponent,
  CustomerEditComponent,
  CustomerDetailsComponent,
  CustomerDeleteComponent,
  CustomerComponent,
  ],

  entryComponents: [
CustomerDeleteComponent,
CustomerEditComponent,
  CustomerAddComponent,
  CustomerDetailsComponent,

  ],
  providers: [CustomersService],
  schemas: [NO_ERRORS_SCHEMA],
})

export class CustomerModule { }
