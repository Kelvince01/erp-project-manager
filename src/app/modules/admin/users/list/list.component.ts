import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAppState } from 'src/app/data/selectors/app.selector';
import { setAPIStatus } from 'src/app/data/stores/app.action';
import { Appstate } from 'src/app/data/stores/appstate';
import { selectUsers } from 'src/app/data/users/user.selector';
import {
  invokeUsersAPI,
  invokeDeleteUserAPI,
} from 'src/app/data/users/users.action';

declare var window: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  users$ = this.store.pipe(select(selectUsers));
  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.store.dispatch(invokeUsersAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(
      invokeDeleteUserAPI({
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
