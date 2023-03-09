import { AdminProfileComponent as AdminProfileComponent } from './common/profile/admin-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsComponent } from './common/admin-settings/admin-settings.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: AdminProfileComponent,
      },
      {
        path: 'settings',
        component: AdminSettingsComponent,
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'organizations',
        loadChildren: () =>
          import('./organizations/organizations.module').then(
            (m) => m.OrganizationsModule
          ),
      },
      {
        path: 'suppliers',
        loadChildren: () =>
          import('./suppliers/suppliers.module').then((m) => m.SuppliersModule),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule),
      },
      {
        path: 'banking',
        loadChildren: () =>
          import('./banking/banking.module').then((m) => m.BankingModule),
      },
      {
        path: 'budgets',
        loadChildren: () =>
          import('./budgets/budgets.module').then((m) => m.BudgetsModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./programs/programs.module').then((m) => m.ProgramsModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
