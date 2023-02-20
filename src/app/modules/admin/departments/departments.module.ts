import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DepartmentsEffect } from '@departments-store/department.effect';
import { departmentReducer } from '@departments-store/departments.reducer';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DepartmentsComponent, ListComponent, UpsertComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    StoreModule.forFeature('departments', departmentReducer),
    EffectsModule.forFeature([DepartmentsEffect]),
    SharedModule,
  ],
})
export class DepartmentsModule {}
