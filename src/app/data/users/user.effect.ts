import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import {
  deleteUserAPISuccess,
  usersFetchAPISuccess,
  invokeDeleteUserAPI,
  invokeUsersAPI,
  invokeSaveNewUserAPI,
  invokeUpdateUserAPI,
  saveNewUserAPISuccess,
  updateUserAPISuccess,
} from './users.action';
import { UserService } from '@services/user.service';
import { setAPIStatus } from '../stores/app.action';
import { Appstate } from '../stores/appstate';
import { selectUsers } from './user.selector';

@Injectable()
export class UsersEffect {
  constructor(
    @Inject(Actions) private actions$: Actions,
    private usersService: UserService,
    @Inject(Store) private store: Store,
    @Inject(Store<Appstate>) private appStore: Store<Appstate>
  ) {}

  saveNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewUserAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.usersService.create(action.newUser).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewUserAPISuccess({ newUser: data });
          })
        );
      })
    );
  });

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUsersAPI),
      withLatestFrom(this.store.pipe(select(selectUsers))),
      mergeMap(([, userformStore]) => {
        if (userformStore.length > 0) {
          return EMPTY;
        }
        return this.usersService
          .get()
          .pipe(map((data) => usersFetchAPISuccess({ allUsers: data.data })));
      })
    )
  );

  updateUserAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateUserAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.usersService.update(action.updateUser).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateUserAPISuccess({ updateUser: data });
          })
        );
      })
    );
  });

  deleteUsersAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteUserAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.usersService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteUserAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
