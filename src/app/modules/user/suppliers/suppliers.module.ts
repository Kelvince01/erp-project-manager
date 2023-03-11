import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import { SharedModule } from '@shared/shared.module';
import { ListComponent } from './list/list.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { PayBillComponent } from './pay-bill/pay-bill.component';

@NgModule({
  declarations: [
    SuppliersComponent,
    ListComponent,
    CreateExpenseComponent,
    PayBillComponent,
  ],
  imports: [CommonModule, SuppliersRoutingModule, SharedModule],
})
export class SuppliersModule {}
