import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as emailSettingActions from './email-setting.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EmailSettingsService } from '@services/email-settings.service';
import { IEmailSetting } from '@models/email-setting.model';

@Injectable()
export class EmailSettingEffects {
  constructor(private actions$: Actions, private svc: EmailSettingsService) {}

  getAllEmailSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emailSettingActions.GET_EMAIL_SETTINGS),
      switchMap(() => this.svc.get()),
      map(
        (heroes) => new emailSettingActions.GetAllEmailSettingsSuccess(heroes)
      ),
      catchError((err) => [
        new emailSettingActions.GetAllEmailSettingsError(err),
      ])
    );
  });

  getEmailSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emailSettingActions.GET_EMAIL_SETTING),
      map((action: emailSettingActions.GetEmailSetting) => action.payload),
      switchMap((id) => this.svc.getById(id)),
      map((hero) => new emailSettingActions.GetEmailSettingSuccess(hero)),
      catchError((err) => [new emailSettingActions.GetEmailSettingError(err)])
    );
  });

  updateEmailSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emailSettingActions.UPDATE_EMAIL_SETTING),
      map((action: emailSettingActions.UpdateEmailSetting) => action.payload),
      switchMap((game) => this.svc.update(game)),
      map(() => new emailSettingActions.UpdateEmailSettingSuccess()),
      catchError((err) => [
        new emailSettingActions.UpdateEmailSettingError(err),
      ])
    );
  });

  createEmailSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emailSettingActions.CREATE_EMAIL_SETTING),
      map((action: emailSettingActions.AddEmailSetting) => action.payload),
      switchMap((newEmailSetting) => this.svc.create(newEmailSetting)),
      map(
        (response: any) =>
          new emailSettingActions.AddEmailSettingSuccess(response.ID)
      ),
      catchError((err) => [new emailSettingActions.AddEmailSettingError(err)])
    );
  });

  removeEmailSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emailSettingActions.DELETE_EMAIL_SETTING),
      map((action: emailSettingActions.RemoveEmailSetting) => action.payload),
      switchMap((id) => this.svc.delete(id)),
      map(
        (hero: IEmailSetting) =>
          new emailSettingActions.RemoveEmailSettingSuccess(hero)
      ),
      catchError((err) => [
        new emailSettingActions.RemoveEmailSettingError(err),
      ])
    );
  });
}
