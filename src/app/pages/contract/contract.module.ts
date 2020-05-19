import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ThemeModule } from '../../@theme/theme.module';
import { ContractRoutingModule } from './contract-routing.module';
import { CustomersService } from '../../customers.service';
import { ContractsService } from '../../contracts.service';
import { ProductService } from './../../product.service';
import { ContractComponent } from './contract.component';

import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';
import {DatepickerComponent} from './../forms/datepicker/datepicker.component';

// MDB
import { ModalModule } from 'angular-bootstrap-md';
import { WavesModule } from 'angular-bootstrap-md';
import { InputsModule } from 'angular-bootstrap-md';
import { ButtonsModule } from 'angular-bootstrap-md';
import { InputUtilitiesModule } from 'angular-bootstrap-md';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { IconsModule } from 'angular-bootstrap-md';
import { TableModule } from 'angular-bootstrap-md';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
// tslint:disable-next-line: max-line-length
import { MatCardModule } from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


import { ReactiveFormsModule } from '@angular/forms';

import { GetServiceComponent } from './services/get-service/get-service.component';

import {  MatDialogRef } from '@angular/material/dialog';
import { EditServiceComponent } from './services/edit-service/edit-service.component';
import { DeleteServiceComponent } from './services/delete-service/delete-service.component';
import { AddServiceComponent } from './services/add-service/add-service.component';
import { GetProductComponent } from './products/get-product/get-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { ServiceDetailsComponent } from './services/service-details/service-details.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import {MatTooltipModule} from '@angular/material/tooltip';

import { LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

const COMPONENTS = [
  ContractComponent,
  DatepickerComponent,
  ServicesComponent,
  ProductsComponent,
];
const MODULES = [
  ThemeModule,
  ModalModule.forRoot(),
  ContractRoutingModule,

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
  MatButtonModule,
  MatIconModule,
  MatSortModule,
  TableModule,
  CommonModule,
  MatToolbarModule,
  MatCardModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMomentDateModule,
];
const SERVICES = [
];
@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,


  GetServiceComponent,
  EditServiceComponent,
  DeleteServiceComponent,
 AddServiceComponent,
 ServiceDetailsComponent,

GetProductComponent,
 AddProductComponent,
EditProductComponent,
DeleteProductComponent,
ProductDetailsComponent,

  ],

  entryComponents: [

  EditServiceComponent,
  DeleteServiceComponent,
AddServiceComponent,
/* GetProductComponent, */
AddProductComponent,
  EditProductComponent,
  DeleteProductComponent,

  ],
  providers: [CustomersService, ContractsService, ProductService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})

/* @NgModule({
  declarations: [
    ServicesComponent,
    ProductsComponent,
    TableComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    GetServiceComponent,
    CustomerDeleteComponent
  ],

  entryComponents: [

	CustomerDeleteComponent,
	CustomerEditComponent,
	CustomerAddComponent,
	AddProductComponent,
	EditProductComponent,
	DeleteProductComponent
  ],
  providers: [CustomersService,ContractsService, ProductService,
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true} },
   {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
],
  schemas: [NO_ERRORS_SCHEMA],
}) */
export class ContractModule { }
