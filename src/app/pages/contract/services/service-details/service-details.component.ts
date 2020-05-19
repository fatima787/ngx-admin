import { Component, OnInit } from '@angular/core';
import { ContractsService } from './../../../../contracts.service';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'ngx-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  custdetails : any ={} ;
  isLoadingResults = true;
  constructor(private contService: ContractsService,private route: ActivatedRoute) { }


  ngOnInit() {
	        this.route.params.subscribe(params => {
        this.contService.getAllServicesById(params['id']).subscribe(data => {
          this.custdetails = data;
          console.log(this.custdetails);
      });

    });
  }

}
