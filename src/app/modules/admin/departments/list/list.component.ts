import { IDepartment } from './../../../../data/models/department.model';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { selectDepartments } from 'src/app/data/departments/department.selector';
import {
  invokeDepartmentsAPI,
  invokeDeleteDepartmentAPI,
} from 'src/app/data/departments/departments.action';
import { selectAppState } from 'src/app/data/selectors/app.selector';
import { setAPIStatus } from 'src/app/data/stores/app.action';
import { Appstate } from 'src/app/data/stores/appstate';

declare var window: any;

@Component({
  selector: 'app-list-departments',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  departments$ = this.store.pipe(select(selectDepartments));
  deleteDialog: boolean = false;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.store.dispatch(invokeDepartmentsAPI());
    console.log(this.departments$);
  }

  openDelete() {
    // this.submitted = false;
    this.deleteDialog = true;
  }

  hideDialog() {
    this.deleteDialog = false;
    // this.submitted = false;
  }

  deleteDepartment(department: IDepartment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + department.Department + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.departments$ = this.departments$.filter(val => val.id !== department.DepartID);
        // this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Department Deleted',
          life: 3000,
        });
      },
    });
  }

  delete() {
    this.store.dispatch(
      invokeDeleteDepartmentAPI({
        id: this.idToDelete,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
}
