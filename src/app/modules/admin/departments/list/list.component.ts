import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectAppState } from 'src/app/data/selectors/app.selector';
import { selectDepartments } from 'src/app/data/selectors/department.selector';
import { setAPIStatus } from 'src/app/data/stores/app.action';
import { Appstate } from 'src/app/data/stores/appstate';
import {
  invokeDeleteDepartmentAPI,
  invokeDepartmentsAPI,
} from 'src/app/data/stores/departments.action';

declare var window: any;

@Component({
  selector: 'app-list-departments',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  departments$ = this.store.pipe(select(selectDepartments));
  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.store.dispatch(invokeDepartmentsAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
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
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
}
