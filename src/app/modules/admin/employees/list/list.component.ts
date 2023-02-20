import { first } from 'rxjs';
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
import { FilesService } from '@services/files.service';

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
  cols: any[] = [];
  exportColumns: any[] = [];
  isDeleting = false;

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    public override router: Router,
    private employeeService: EmployeesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private filesService: FilesService
  ) {
    super(router);
  }

  override ngOnInit() {
    this.store.dispatch(invokeDepartmentsAPI());
    this.getEmployees();

    this.cols = [
      {
        field: 'FirstName',
        header: 'FirstName',
        customExportHeader: 'First Name',
      },
      { field: 'Surname', header: 'Surname' },
      { field: 'IDNo', header: 'IDNo' },
      { field: 'Town', header: 'Town' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getEmployees() {
    this.employeeService
      .employees$()
      .pipe(first())
      .subscribe((data: any) => {
        this.employees = data.data;
      });
  }

  deleteSelectedEmployees() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected employees?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedEmployees.forEach((employee: IEmployee) => {
          this.isDeleting = true;
          this.employeeService
            .delete(employee.EmployeeID!)
            .pipe(first())
            .subscribe();
          this.isDeleting = false;
          this.getEmployees();
        });
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
        this.isDeleting = true;
        this.employeeService
          .delete(employee.EmployeeID!)
          .pipe(first())
          .subscribe();
        this.isDeleting = false;
        this.getEmployees();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employee Deleted',
          life: 3000,
        });
      },
    });
  }

  exportPdf() {
    this.filesService.exportPdf(this.cols, this.employees, 'Suppliers List');
  }

  exportExcel() {
    this.filesService.exportExcel(this.cols, 'Suppliers List');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.filesService.saveAsExcelFile(buffer, fileName);
  }

  reloadCurrent() {
    this.reloadComponent(true);
  }
}
