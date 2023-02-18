import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, retry, switchMap, withLatestFrom } from 'rxjs';
import { EmailSettingsService } from '../services/email-settings.service';
import {
  deleteEmailSettingAPISuccess,
  emailSettingsFetchAPISuccess,
  invokeDeleteEmailSettingAPI,
  invokeEmailSettingsAPI,
  invokeSaveNewEmailSettingAPI,
  invokeUpdateEmailSettingAPI,
  saveNewEmailSettingAPISuccess,
  updateEmailSettingAPISuccess,
} from './email-setting.action';
import { setAPIStatus } from '../stores/app.action';
import { Appstate } from '../stores/appstate';
import { selectEmailSettings } from './email-setting.selector';
import { Paginated } from '@feathersjs/feathers';

@Injectable()
export class EmailSettingsEffect {
  constructor(
    @Inject(Actions) private actions$: Actions,
    private emailSettingsService: EmailSettingsService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  saveNewEmailSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewEmailSettingAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.emailSettingsService.create(action.newEmailSetting).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewEmailSettingAPISuccess({ newEmailSetting: data });
          })
        );
      })
    );
  });

  loadAllEmailSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeEmailSettingsAPI),
      withLatestFrom(this.store.pipe(select(selectEmailSettings))),
      mergeMap(([, emailSettingFormStore]) => {
        if (emailSettingFormStore.length > 0) {
          return EMPTY;
        }
        return this.emailSettingsService.get().pipe(
          retry(2),
          // map((response: Paginated<any>) => response.data)
          map((data: Paginated<any>) =>
            emailSettingsFetchAPISuccess({ allEmailSettings: data.data })
          )
        );
      })
    )
  );

  updateEmailSettingAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateEmailSettingAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.emailSettingsService.update(action.updateEmailSetting).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateEmailSettingAPISuccess({ updateEmailSetting: data });
          })
        );
      })
    );
  });

  deleteEmailSettingsAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteEmailSettingAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.emailSettingsService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteEmailSettingAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
