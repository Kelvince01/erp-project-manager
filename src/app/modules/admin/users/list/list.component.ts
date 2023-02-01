import {
  ACTIONS,
  AppState,
  IUser,
} from './../../../../data/reducers/users.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Rx from 'rxjs';
import {
  IFilter,
  ACTIONS as FilterACTIONS,
} from 'src/app/data/reducers/user-filter.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public users: Rx.Observable<Array<IUser>>;
  public filter: Rx.Observable<IFilter>;

  constructor(private store: Store<AppState>) {
    // this.users = store.select('users');
    this.users = Rx.Observable.combineLatest(
      store.select('users'),
      store.select('filter'),
      this.applyFilter
    );
  }

  applyFilter(users: Array<IUser>, filter: IFilter): Array<IUser> {
    return users
      .filter(
        (x) =>
          !filter.name ||
          x.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
      )
      .filter(
        (x) =>
          !filter.email ||
          x.email.toLowerCase().indexOf(filter.email.toLowerCase()) !== -1
      );
  }

  ngOnInit(): void {}

  delete(user: any) {
    this.store.dispatch({
      type: ACTIONS.DELETE_USER,
      payload: user,
    });
  }
}
