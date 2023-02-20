import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import {
  deleteCompanyInfoAPISuccess,
  companyInfosFetchAPISuccess,
  invokeDeleteCompanyInfoAPI,
  invokeCompanyInfosAPI,
  invokeSaveNewCompanyInfoAPI,
  invokeUpdateCompanyInfoAPI,
  saveNewCompanyInfoAPISucess,
  updateCompanyInfoAPISucess,
} from './company-info.action';
import { CompanyInfoService } from '@services/company-info.service';
import { setAPIStatus } from '../stores/app.action';
import { Appstate } from '../stores/appstate';
import { selectCompanyInfos } from './company-info.selector';

@Injectable()
export class CompanyInfosEffect {
  constructor(
    private actions$: Actions,
    private companyInfosService: CompanyInfoService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  saveNewCompanyInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewCompanyInfoAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.companyInfosService.create(action.newCompanyInfo).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewCompanyInfoAPISucess({ newCompanyInfo: data });
          })
        );
      })
    );
  });

  loadAllCompanyInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeCompanyInfosAPI),
      withLatestFrom(this.store.pipe(select(selectCompanyInfos))),
      mergeMap(([, companyInfoFormStore]) => {
        if (companyInfoFormStore.length > 0) {
          return EMPTY;
        }
        return this.companyInfosService
          .companies$()
          .pipe(
            map((data) =>
              companyInfosFetchAPISuccess({ allCompanyInfos: data.data })
            )
          );
      })
    )
  );

  updateCompanyInfoAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateCompanyInfoAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.companyInfosService.update(action.updateCompanyInfo).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateCompanyInfoAPISucess({ updateCompanyInfo: data });
          })
        );
      })
    );
  });

  deleteCompanyInfosAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteCompanyInfoAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.companyInfosService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteCompanyInfoAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
