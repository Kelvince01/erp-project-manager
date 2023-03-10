import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IEmailSetting } from '@models/email-setting.model';

export const selectEmailSettings = createFeatureSelector<any>('email-settings');
// createFeatureSelector<IEmailSetting[]>('email-settings');

export const selectEmailSettingById = (emailSettingId: number) =>
  createSelector(selectEmailSettings, (emailSettings: IEmailSetting[]) => {
    var emailSettingbyId = emailSettings.filter((_) => _.ID == emailSettingId);
    if (emailSettingbyId.length == 0) {
      return null;
    }
    return emailSettingbyId[0];
  });

// export const areEmailSettingsLoaded = createSelector(
//   selectEmailSettings,
//   (state) => state
//   // (state) => state.departmantsLoaded
// );
