import { ReceiveRefundComponent } from './receive-refund/receive-refund.component';
import { ReceiveDebitNoteComponent } from './receive-debit-note/receive-debit-note.component';
import { SuppliersComponent } from './suppliers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';

const routes: Routes = [
  {
    path: '',
    component: SuppliersComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'add',
        component: UpsertComponent,
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
      },
      {
        path: 'receive-debit-note',
        component: ReceiveDebitNoteComponent,
      },
      {
        path: 'receive-refund',
        component: ReceiveRefundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuppliersRoutingModule {}
