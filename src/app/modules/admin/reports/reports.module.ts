import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SupplierReportsComponent } from './supplier-reports/supplier-reports.component';
import { SharedModule } from '@shared/shared.module';
import { PaymentsMadeComponent } from './payments-made/payments-made.component';
import { ReportsLayoutComponent } from './reports-layout/reports-layout.component';

@NgModule({
  declarations: [ReportsComponent, SupplierReportsComponent, PaymentsMadeComponent, ReportsLayoutComponent],
  imports: [CommonModule, ReportsRoutingModule, SharedModule],
})
export class ReportsModule {}
