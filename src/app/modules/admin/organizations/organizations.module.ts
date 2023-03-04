import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { DepartmentsModule } from './departments/departments.module';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { companyInfoReducer } from '@company-store/company-info.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CompanyInfosEffect } from '@company-store/company-info.effect';
import { EmailSettingsComponent } from './common/email-settings/email-settings.component';
import { emailSettingReducer } from '@email-setting-store/email-setting.reducer';
import { SharedModule } from '@shared/shared.module';
import { EmailSettingsEffect } from '@email-setting-store/email-setting.effect';

export const reducers: ActionReducerMap<any> = {
  emailSettings: emailSettingReducer,
  companyInfo: companyInfoReducer,
};

@NgModule({
  declarations: [
    OrganizationsComponent,
    ListComponent,
    UpsertComponent,
    EmailSettingsComponent,
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    DepartmentsModule,
    SharedModule,
    // StoreModule.forFeature('company-info', reducers),
    StoreModule.forFeature('company-info', companyInfoReducer),
    StoreModule.forFeature('email-settings', emailSettingReducer),
    EffectsModule.forFeature([CompanyInfosEffect, EmailSettingsEffect]),
  ],
})
export class OrganizationsModule {}
