import { Component, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {ProductService} from '../../../../product.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'ngx-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {


  constructor(public dialogRef: MatDialogRef<DeleteProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public proService: ProductService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log(this.data);
    this.proService.deletePro(this.data.id, this.data.ProductName);
  }
}
