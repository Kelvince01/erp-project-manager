import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankingRoutingModule } from './banking-routing.module';
import { BankingComponent } from './banking.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { UpsertAccountTypeComponent } from './upsert-account-type/upsert-account-type.component';
import { UpsertBankComponent } from './upsert-bank/upsert-bank.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { AddCurrencyComponent } from './add-currency/add-currency.component';

@NgModule({
  declarations: [BankingComponent, ListComponent, UpsertComponent, UpsertAccountTypeComponent, UpsertBankComponent, AddCountryComponent, AddCurrencyComponent],
  imports: [CommonModule, BankingRoutingModule, SharedModule],
})
export class BankingModule {}
