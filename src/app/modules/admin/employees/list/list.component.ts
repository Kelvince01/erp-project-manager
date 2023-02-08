import { invokeDepartmentsAPI } from './../../../../data/departments/departments.action';
import { selectDepartments } from './../../../../data/departments/department.selector';
import { EmployeesService } from './../../../../data/services/employees.service';
import { IEmployee } from './../../../../data/models/employee.model';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonFunctionalityComponent } from '@shared/components/common-functionality/common-functionality.component';
import { Router } from '@angular/router';
import { Appstate } from '@stores/appstate';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent extends CommonFunctionalityComponent {
  employees: IEmployee[] = [];
  employee: IEmployee = {};
  selectedEmployees: IEmployee[] = [];
  submitted: boolean = false;
  department$ = this.store.pipe(select(selectDepartments))! as any;

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    public override router: Router,
    private employeeService: EmployeesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    super(router);
  }

  override ngOnInit() {
    this.store.dispatch(invokeDepartmentsAPI());
    this.employeeService.get().subscribe((data: any) => {
      // console.log(data.data);
      this.employees = data.data;
    });
    // .pipe((data: any) => (this.employees = data.data));
    // console.log(this.employees);
  }

  deleteSelectedEmployees() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected employees?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employees = this.employees.filter(
          (val) => !this.selectedEmployees.includes(val)
        );
        this.selectedEmployees = {} as any;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employees Deleted',
          life: 3000,
        });
      },
    });
  }

  deleteEmployee(employee: IEmployee) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + employee.FirstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employees = this.employees.filter(
          (val) => val.EmployeeID !== employee.EmployeeID
        );
        this.employee = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employee Deleted',
          life: 3000,
        });
      },
    });
  }

  reloadCurrent() {
    this.reloadComponent(true);
  }
}
