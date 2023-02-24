import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, retry, switchMap, withLatestFrom } from 'rxjs';
import { DepartmentsService } from '../services/departments.service';
import {
  deleteDepartmentAPISuccess,
  departmentsFetchAPISuccess,
  invokeDeleteDepartmentAPI,
  invokeDepartmentsAPI,
  invokeSaveNewDepartmentAPI,
  invokeUpdateDepartmentAPI,
  saveNewDepartmentAPISuccess,
  updateDepartmentAPISuccess,
} from './departments.action';
import { setAPIStatus } from '../stores/app.action';
import { Appstate } from '../stores/appstate';
import { selectDepartments } from './department.selector';
import { Paginated } from '@feathersjs/feathers';

@Injectable()
export class DepartmentsEffect {
  constructor(
    @Inject(Actions) private actions$: Actions,
    private departmentsService: DepartmentsService,
    @Inject(Store) private store: Store,
    @Inject(Store<Appstate>) private appStore: Store<Appstate>
  ) {}

  saveNewDepartment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewDepartmentAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.departmentsService.create(action.newDepartment).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewDepartmentAPISuccess({ newDepartment: data });
          })
        );
      })
    );
  });

  loadAllDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDepartmentsAPI),
      withLatestFrom(this.store.pipe(select(selectDepartments))),
      mergeMap(([, departmentFormStore]) => {
        if (departmentFormStore.length > 0) {
          return EMPTY;
        }
        return this.departmentsService.departments$().pipe(
          retry(2),
          map((data: Paginated<any>) =>
            departmentsFetchAPISuccess({ allDepartments: data.data })
          )
        );
      })
    )
  );

  updateDepartmentAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateDepartmentAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.departmentsService.update(action.updateDepartment).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateDepartmentAPISuccess({ updateDepartment: data });
          })
        );
      })
    );
  });

  deleteDepartmentsAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteDepartmentAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.departmentsService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteDepartmentAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
