import { ReportsLayoutComponent } from './reports-layout/reports-layout.component';
import { PaymentsMadeComponent } from './payments-made/payments-made.component';
import { SupplierReportsComponent } from './supplier-reports/supplier-reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReportsLayoutComponent,
  },
  {
    path: 'bills',
    component: SupplierReportsComponent,
  },
  {
    path: 'payments-made',
    component: PaymentsMadeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
