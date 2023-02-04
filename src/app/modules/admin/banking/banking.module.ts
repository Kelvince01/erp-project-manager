import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankingRoutingModule } from './banking-routing.module';
import { BankingComponent } from './banking.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';


@NgModule({
  declarations: [
    BankingComponent,
    ListComponent,
    UpsertComponent
  ],
  imports: [
    CommonModule,
    BankingRoutingModule
  ]
})
export class BankingModule { }
