import { Component, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {ContractsService} from '../../../../contracts.service';



@Component({
  selector: 'ngx-delete-service',
  templateUrl: './delete-service.component.html',
  styleUrls: ['./delete-service.component.scss']
})
export class DeleteServiceComponent {

  constructor(public dialogRef: MatDialogRef<DeleteServiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public contractService: ContractsService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.contractService.contDelete(this.data.id, this.data.ContractName);
  }
}
