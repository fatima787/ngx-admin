import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../../product.service';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

 product: any = {};
  isLoadingResults = true;
  constructor(private proService: ProductService,private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.proService.getAllProductsById(params['id']).subscribe(data => {
        this.product = data;
        console.log(this.product);
    });

  });

}
}
