import { ReportsModule } from './reports/reports.module';
import { BudgetsModule } from './budgets/budgets.module';
import { BankingModule } from './banking/banking.module';
import { EmployeesModule } from './employees/employees.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProgramsModule } from './programs/programs.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UsersModule } from './users/users.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminProfileComponent } from './common/profile/admin-profile.component';
import { AdminSettingsComponent } from './common/admin-settings/admin-settings.component';

@NgModule({
  declarations: [
    AdminComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    AdminProfileComponent,
    AdminSettingsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    UsersModule,
    SuppliersModule,
    ProgramsModule,
    OrganizationsModule,
    EmployeesModule,
    BankingModule,
    BudgetsModule,
    ReportsModule,
  ],
})
export class AdminModule {}
