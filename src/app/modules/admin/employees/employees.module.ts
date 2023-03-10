import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { AddEmployeeDocumentsComponent } from './upsert/add-employee-documents/add-employee-documents.component';
import { AddEmployeePayrollInfoComponent } from './upsert/add-employee-payroll-info/add-employee-payroll-info.component';
import { AddEmployeePayrollDependantsComponent } from './upsert/add-employee-payroll-dependants/add-employee-payroll-dependants.component';
import { UpsertTitleComponent } from './upsert-title/upsert-title.component';

@NgModule({
  declarations: [EmployeesComponent, ListComponent, UpsertComponent, AddEmployeeDocumentsComponent, AddEmployeePayrollInfoComponent, AddEmployeePayrollDependantsComponent, UpsertTitleComponent],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule],
})
export class EmployeesModule {}
