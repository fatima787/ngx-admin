import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractComponent } from './contract.component';
import {ServicesComponent} from './services/services.component' ;
import {ProductsComponent} from './products/products.component' ;
import {ServiceDetailsComponent} from './services/service-details/service-details.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
const routes: Routes = [
  {

    path: '',
    component: ContractComponent,
    children: [
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
	    {
	    path: 'services/details/:id',
        component: ServiceDetailsComponent,
      },
	     {
	    path: 'products/details/:id',
        component: ProductDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule],
})
export class ContractRoutingModule {
}
