import { BudgetsComponent } from './budgets.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetsComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetsRoutingModule {}
