import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { ReceiveBillComponent } from './receive-bill/receive-bill.component';
import { PayBillComponent } from './pay-bill/pay-bill.component';
import { ReceiveDebitNoteComponent } from './receive-debit-note/receive-debit-note.component';
import { ReceiveRefundComponent } from './receive-refund/receive-refund.component';

@NgModule({
  declarations: [
    SuppliersComponent,
    ListComponent,
    UpsertComponent,
    ReceiveBillComponent,
    PayBillComponent,
    ReceiveDebitNoteComponent,
    ReceiveRefundComponent,
  ],
  imports: [CommonModule, SuppliersRoutingModule, SharedModule],
})
export class SuppliersModule {}
