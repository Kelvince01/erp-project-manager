import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';

@NgModule({
  declarations: [EmployeesComponent, ListComponent, UpsertComponent],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule],
})
export class EmployeesModule {}
