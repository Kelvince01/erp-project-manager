import { Component } from '@angular/core';
import { ISupplier } from '@models/supplier.model';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent {
  supplier: ISupplier = {};
  submitted: boolean = false;
}
