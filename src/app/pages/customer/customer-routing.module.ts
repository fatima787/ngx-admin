import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CustomerComponent} from './customer.component';
import {TableComponent} from './table/table.component';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';

const routes: Routes = [

  {
         path: 'details/:id',
        component: CustomerDetailsComponent,
      },

     {
      path: '',
     component: CustomerComponent,
   },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule],
})
export class CustomerRoutingModule {
}
