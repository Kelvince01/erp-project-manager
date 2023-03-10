import { createReducer, on } from '@ngrx/store';
import { IEmailSetting } from '@models/email-setting.model';
import {
  deleteEmailSettingAPISuccess,
  emailSettingsFetchAPISuccess,
  saveNewEmailSettingAPISuccess as saveNewEmailSettingAPISuccess,
  updateEmailSettingAPISuccess as updateEmailSettingAPISuccess,
} from '../email-settings/email-setting.action';

export const initialState: ReadonlyArray<IEmailSetting> = [];

export const emailSettingReducer = createReducer(
  initialState,
  on(emailSettingsFetchAPISuccess, (state, { allEmailSettings }) => {
    return allEmailSettings;
  }),

  on(saveNewEmailSettingAPISuccess, (state, { newEmailSetting }) => {
    let newState = [...state];
    newState.unshift(newEmailSetting);
    return newState;
  }),

  on(updateEmailSettingAPISuccess, (state, { updateEmailSetting }) => {
    let newState = state.filter((_) => _.ID != updateEmailSetting.ID);
    newState.unshift(updateEmailSetting);
    return newState;
  }),

  on(deleteEmailSettingAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.ID != id);
    return newState;
  })
);
