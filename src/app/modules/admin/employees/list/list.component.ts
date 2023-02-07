import { EmployeesService } from './../../../../data/services/employees.service';
import { IEmployee } from './../../../../data/models/employee.model';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  employees: IEmployee[] = [];
  employee: IEmployee = {};
  selectedEmployees: IEmployee[] = [];
  submitted: boolean = false;
  statuses: any[] = [];

  constructor(
    private employeeService: EmployeesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.employeeService.get().subscribe((data: any) => {
      // console.log(data.data);
      this.employees = data.data;
    });
    // .pipe((data: any) => (this.employees = data.data));
    // console.log(this.employees);

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
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
}
