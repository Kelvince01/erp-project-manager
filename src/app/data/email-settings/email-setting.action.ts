import { createAction, props } from '@ngrx/store';
import { IEmailSetting } from './../models/email-setting.model';

export const invokeEmailSettingsAPI = createAction(
  '[Email Settings API] Invoke EmailSettings Fetch API'
);

export const emailSettingsFetchAPISuccess = createAction(
  '[Email Settings API] Fetch API Success',
  // props<{ allEmailSettings: IEmailSetting[] }>()
  props<{ allEmailSettings: any }>()
);

export const invokeSaveNewEmailSettingAPI = createAction(
  '[Email Settings API] Invoke save new email setting api',
  props<{ newEmailSetting: IEmailSetting }>()
);

export const saveNewEmailSettingAPISuccess = createAction(
  '[Email Settings API] save new email setting api success',
  props<{ newEmailSetting: IEmailSetting }>()
);

export const invokeUpdateEmailSettingAPI = createAction(
  '[Email Settings API] Invoke update email setting api',
  props<{ updateEmailSetting: IEmailSetting }>()
);

export const updateEmailSettingAPISuccess = createAction(
  '[Email Settings API] update  email setting api success',
  props<{ updateEmailSetting: IEmailSetting }>()
);

export const invokeDeleteEmailSettingAPI = createAction(
  '[Email Settings API] Invoke delete email setting api',
  props<{ id: number }>()
);

export const deleteEmailSettingAPISuccess = createAction(
  '[Email Settings API] deleted email setting api success',
  props<{ id: number }>()
);
