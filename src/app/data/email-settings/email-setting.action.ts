import { IEmailSetting } from './../models/email-setting.model';
import { Action } from '@ngrx/store';

export const GET_EMAIL_SETTINGS = '[ALL] EmailSettings';
export const GET_EMAIL_SETTINGS_SUCCESS = '[ALL] EmailSettings Success';
export const GET_EMAIL_SETTINGS_ERROR = '[ALL] EmailSettings Error';

export const GET_EMAIL_SETTING = '[GET] EmailSetting';
export const GET_EMAIL_SETTING_SUCCESS = '[GET] EmailSettings Success';
export const GET_EMAIL_SETTING_ERROR = '[GET] EmailSettings Error';

export const CREATE_EMAIL_SETTING = '[CREATE] EmailSetting';
export const CREATE_EMAIL_SETTING_SUCCESS = '[CREATE] Email Setting Success';
export const CREATE_EMAIL_SETTING_ERROR = '[CREATE] Email Setting Error';

export const DELETE_EMAIL_SETTING = '[DELETE] EmailSetting';
export const DELETE_EMAIL_SETTING_SUCCESS = '[DELETE] Email Setting Success';
export const DELETE_EMAIL_SETTING_ERROR = '[DELETE] Email Setting Error';

export const UPDATE_EMAIL_SETTING = '[UPDATE] EmailSetting';
export const UPDATE_EMAIL_SETTING_SUCCESS = '[UPDATE] Email Setting Success';
export const UPDATE_EMAIL_SETTING_ERROR = '[UPDATE] Email Setting Error';

/****************************************
 * GET all the email settings
 ****************************************/
export class GetAllEmailSettings implements Action {
  readonly type = GET_EMAIL_SETTINGS;
}

export class GetAllEmailSettingsSuccess implements Action {
  readonly type = GET_EMAIL_SETTINGS_SUCCESS;

  constructor(public payload: IEmailSetting[]) {}
}

export class GetAllEmailSettingsError implements Action {
  readonly type = GET_EMAIL_SETTINGS_ERROR;

  constructor(public payload: Error) {}
}

/****************************************
 * GET email setting by id
 ****************************************/
export class GetEmailSetting implements Action {
  readonly type = GET_EMAIL_SETTING;

  constructor(public payload: number) {}
}

export class GetEmailSettingSuccess implements Action {
  readonly type = GET_EMAIL_SETTING_SUCCESS;

  constructor(public payload: IEmailSetting) {}
}

export class GetEmailSettingError implements Action {
  readonly type = GET_EMAIL_SETTING_ERROR;

  constructor(public payload: Error) {}
}

/****************************************
 * ADD new email setting
 ****************************************/
export class AddEmailSetting implements Action {
  readonly type = CREATE_EMAIL_SETTING;

  constructor(public payload: IEmailSetting) {}
}

export class AddEmailSettingSuccess implements Action {
  readonly type = CREATE_EMAIL_SETTING_SUCCESS;

  constructor(public payload: number) {}
}

export class AddEmailSettingError implements Action {
  readonly type = CREATE_EMAIL_SETTING_ERROR;

  constructor(public payload: Error) {}
}

/****************************************
 * REMOVE a email setting by id
 ****************************************/
export class RemoveEmailSetting implements Action {
  readonly type = DELETE_EMAIL_SETTING;

  constructor(public payload: number) {}
}

export class RemoveEmailSettingSuccess implements Action {
  readonly type = DELETE_EMAIL_SETTING_SUCCESS;

  constructor(public payload: IEmailSetting) {}
}

export class RemoveEmailSettingError implements Action {
  readonly type = DELETE_EMAIL_SETTING_ERROR;

  constructor(public payload: Error) {}
}

/****************************************
 * UPDATE email setting by id
 ****************************************/
export class UpdateEmailSetting implements Action {
  readonly type = UPDATE_EMAIL_SETTING;

  constructor(public payload: IEmailSetting) {}
}

export class UpdateEmailSettingSuccess implements Action {
  readonly type = UPDATE_EMAIL_SETTING_SUCCESS;
}

export class UpdateEmailSettingError implements Action {
  readonly type = UPDATE_EMAIL_SETTING_ERROR;

  constructor(public payload: Error) {}
}
