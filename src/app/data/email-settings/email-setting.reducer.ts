import * as emailSettingActions from './email-setting.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IEmailSetting } from '@models/email-setting.model';
import { AppAction } from '@stores/app.action';

export interface State {
  data: IEmailSetting[];
  selected: IEmailSetting;
  action: string;
  done: boolean;
  error?: Error;
}

function emptyEmailSetting(): IEmailSetting {
  return {};
}

function emptyError(): Error {
  return {
    name: '',
    message: '',
  };
}

const initialState: State = {
  data: [],
  selected: emptyEmailSetting(),
  action: '',
  done: false,
  error: emptyError(),
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
    /*************************
     * GET all email settings actions
     ************************/
    case emailSettingActions.GET_EMAIL_SETTINGS:
      return {
        ...state,
        action: emailSettingActions.GET_EMAIL_SETTINGS,
        done: false,
        selected: emptyEmailSetting(),
        error: emptyError(),
      };
    case emailSettingActions.GET_EMAIL_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: emptyEmailSetting(),
        error: emptyError(),
      };
    case emailSettingActions.GET_EMAIL_SETTINGS_ERROR:
      return {
        ...state,
        done: true,
        selected: emptyEmailSetting(),
        error: action.payload,
      };

    /*************************
     * GET email setting by id actions
     ************************/
    case emailSettingActions.GET_EMAIL_SETTING:
      return {
        ...state,
        action: emailSettingActions.GET_EMAIL_SETTING,
        done: false,
        selected: emptyEmailSetting(),
        error: emptyError(),
      };
    case emailSettingActions.GET_EMAIL_SETTING_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: emptyError(),
      };
    case emailSettingActions.GET_EMAIL_SETTING_ERROR:
      return {
        ...state,
        selected: emptyEmailSetting(),
        done: true,
        error: action.payload,
      };

    /*************************
     * CREATE email setting actions
     ************************/
    case emailSettingActions.CREATE_EMAIL_SETTING:
      return {
        ...state,
        selected: action.payload,
        action: emailSettingActions.CREATE_EMAIL_SETTING,
        done: false,
        error: emptyError(),
      };
    case emailSettingActions.CREATE_EMAIL_SETTING_SUCCESS: {
      const newEmailSetting = {
        ...state.selected,
        id: action.payload,
      };
      const data = [...state.data, newEmailSetting];
      return {
        ...state,
        data,
        selected: emptyEmailSetting(),
        error: emptyError(),
        done: true,
      };
    }
    case emailSettingActions.CREATE_EMAIL_SETTING_ERROR:
      return {
        ...state,
        selected: emptyEmailSetting(),
        done: true,
        error: action.payload,
      };

    /*************************
     * UPDATE email setting actions
     ************************/
    case emailSettingActions.UPDATE_EMAIL_SETTING:
      return {
        ...state,
        selected: action.payload,
        action: emailSettingActions.UPDATE_EMAIL_SETTING,
        done: false,
        error: emptyError(),
      };
    case emailSettingActions.UPDATE_EMAIL_SETTING_SUCCESS: {
      const index = state.data.findIndex((h) => h.ID === state.selected.ID);
      if (index >= 0) {
        const data = [
          ...state.data.slice(0, index),
          state.selected,
          ...state.data.slice(index + 1),
        ];
        return {
          ...state,
          data,
          done: true,
          selected: emptyEmailSetting(),
          error: emptyError(),
        };
      }
      return state;
    }
    case emailSettingActions.UPDATE_EMAIL_SETTING_ERROR:
      return {
        ...state,
        done: true,
        selected: emptyEmailSetting(),
        error: action.payload,
      };

    /*************************
     * DELETE email setting actions
     ************************/
    case emailSettingActions.DELETE_EMAIL_SETTING: {
      const selected: IEmailSetting = state.data.find(
        (h) => h.ID === action.payload
      ) as IEmailSetting;
      return {
        ...state,
        selected,
        action: emailSettingActions.DELETE_EMAIL_SETTING,
        done: false,
        error: emptyError(),
      };
    }
    case emailSettingActions.DELETE_EMAIL_SETTING_SUCCESS: {
      const data = state.data.filter((h) => h.ID !== state.selected.ID);
      return {
        ...state,
        data,
        selected: emptyEmailSetting(),
        error: emptyError(),
        done: true,
      };
    }
    case emailSettingActions.DELETE_EMAIL_SETTING_ERROR:
      return {
        ...state,
        selected: emptyEmailSetting(),
        done: true,
        error: action.payload,
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getEmailSettingsState =
  createFeatureSelector<State>('emailSettings');
export const getAllEmailSettings = createSelector(
  getEmailSettingsState,
  (state: State) => state.data
);
export const getEmailSetting = createSelector(
  getEmailSettingsState,
  (state: State) => {
    if (state.action === emailSettingActions.GET_EMAIL_SETTING && state.done) {
      return state.selected;
    } else {
      return null;
    }
  }
);
export const isDeleted = createSelector(
  getEmailSettingsState,
  (state: State) =>
    state.action === emailSettingActions.DELETE_EMAIL_SETTING &&
    state.done &&
    !state.error
);
export const isCreated = createSelector(
  getEmailSettingsState,
  (state: State) =>
    state.action === emailSettingActions.CREATE_EMAIL_SETTING &&
    state.done &&
    !state.error
);
export const isUpdated = createSelector(
  getEmailSettingsState,
  (state: State) =>
    state.action === emailSettingActions.UPDATE_EMAIL_SETTING &&
    state.done &&
    !state.error
);

export const getDeleteError = createSelector(
  getEmailSettingsState,
  (state: State) => {
    return state.action === emailSettingActions.DELETE_EMAIL_SETTING
      ? state.error
      : null;
  }
);
export const getCreateError = createSelector(
  getEmailSettingsState,
  (state: State) => {
    return state.action === emailSettingActions.CREATE_EMAIL_SETTING
      ? state.error
      : null;
  }
);
export const getUpdateError = createSelector(
  getEmailSettingsState,
  (state: State) => {
    return state.action === emailSettingActions.UPDATE_EMAIL_SETTING
      ? state.error
      : null;
  }
);
export const getEmailSettingsError = createSelector(
  getEmailSettingsState,
  (state: State) => {
    return state.action === emailSettingActions.GET_EMAIL_SETTINGS
      ? state.error
      : null;
  }
);
export const getEmailSettingError = createSelector(
  getEmailSettingsState,
  (state: State) => {
    return state.action === emailSettingActions.GET_EMAIL_SETTING
      ? state.error
      : null;
  }
);
