import { DepartmentsEffect } from './../../../data/stores/department.effect';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { StoreModule } from '@ngrx/store';
import { departmentReducer } from 'src/app/data/reducers/departments.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [DepartmentsComponent, ListComponent, UpsertComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    StoreModule.forFeature('departments', departmentReducer),
    EffectsModule.forFeature([DepartmentsEffect]),
  ],
})
export class DepartmentsModule {}
