import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './budgets.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';

@NgModule({
  declarations: [BudgetsComponent, ListComponent, UpsertComponent],
  imports: [CommonModule, BudgetsRoutingModule, SharedModule],
})
export class BudgetsModule {}
