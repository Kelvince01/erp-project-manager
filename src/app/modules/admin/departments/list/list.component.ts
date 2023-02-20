import { IDepartment } from './../../../../data/models/department.model';
import { Component, Inject, OnInit } from '@angular/core';
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
    @Inject(Store) private store: Store,
    @Inject(Store<Appstate>) private appStore: Store<Appstate>,
    @Inject(MessageService) private messageService: MessageService,
    @Inject(ConfirmationService)
    private confirmationService: ConfirmationService
  ) {}

  departments$ = this.store.pipe(select(selectDepartments));

  ngOnInit(): void {
    this.store.dispatch(invokeDepartmentsAPI());
  }

  deleteDepartment(department: IDepartment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + department.Department + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(
          invokeDeleteDepartmentAPI({
            id: department.DepartID,
          })
        );
        let apiStatus$ = this.appStore.pipe(select(selectAppState));
        apiStatus$.subscribe((apState) => {
          if (apState.apiStatus == 'success') {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: '' },
              })
            );
          }
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Department Deleted',
          life: 3000,
        });
      },
    });
  }
}
