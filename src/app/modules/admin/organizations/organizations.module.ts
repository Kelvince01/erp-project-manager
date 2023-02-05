import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { StoreModule } from '@ngrx/store';
import { companyInfoReducer } from '@company-store/company-info.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CompanyInfosEffect } from '@company-store/company-info.effect';

@NgModule({
  declarations: [OrganizationsComponent, ListComponent, UpsertComponent],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    SharedModule,
    StoreModule.forFeature('company-info', companyInfoReducer),
    EffectsModule.forFeature([CompanyInfosEffect]),
  ],
})
export class OrganizationsModule {}
