import { Component, OnInit } from '@angular/core';
import { CustomersService } from './../../../customers.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

 customer: any = {};
  isLoadingResults = true;
  constructor(private custService: CustomersService,private route: ActivatedRoute) { }


  ngOnInit() {
	        this.route.params.subscribe(params => {
        this.custService.getAllCustomersById(params['id']).subscribe(res => {
          this.customer = res;
      });

    });
  }

}
