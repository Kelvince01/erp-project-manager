import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./departments/departments.module').then(
            (m) => m.DepartmentsModule
          ),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'company-info',
        loadChildren: () =>
          import('./company-info/company-info.module').then(
            (m) => m.CompanyInfoModule
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
        path: 'programs',
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
