import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SupplierReportsComponent } from './supplier-reports/supplier-reports.component';


@NgModule({
  declarations: [
    ReportsComponent,
    SupplierReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
