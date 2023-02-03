import { Injectable } from '@angular/core';
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
  saveNewDepartmentAPISucess,
  updateDepartmentAPISucess,
} from './departments.action';
import { setAPIStatus } from '../stores/app.action';
import { Appstate } from '../stores/appstate';
import { selectDepartments } from './department.selector';
import { Paginated } from '@feathersjs/feathers';

@Injectable()
export class DepartmentsEffect {
  constructor(
    private actions$: Actions,
    private departmentsService: DepartmentsService,
    private store: Store,
    private appStore: Store<Appstate>
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
            return saveNewDepartmentAPISucess({ newDepartment: data });
          })
        );
      })
    );
  });

  loadAllDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDepartmentsAPI),
      withLatestFrom(this.store.pipe(select(selectDepartments))),
      mergeMap(([, departmentformStore]) => {
        if (departmentformStore.length > 0) {
          return EMPTY;
        }
        return this.departmentsService.get().pipe(
          retry(2),
          // map((response: Paginated<any>) => response.data)
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
            return updateDepartmentAPISucess({ updateDepartment: data });
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
