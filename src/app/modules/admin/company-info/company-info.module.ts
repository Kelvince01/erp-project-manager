import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyInfoRoutingModule } from './company-info-routing.module';
import { CompanyInfoComponent } from './company-info.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CompanyInfosEffect } from '@company-store/company-info.effect';
import { companyInfoReducer } from '@company-store/company-info.reducer';

@NgModule({
  declarations: [CompanyInfoComponent, ListComponent, UpsertComponent],
  imports: [
    CommonModule,
    CompanyInfoRoutingModule,
    SharedModule,
    StoreModule.forFeature('company-info', companyInfoReducer),
    EffectsModule.forFeature([CompanyInfosEffect]),
  ],
})
export class CompanyInfoModule {}
