import { createAction, props } from '@ngrx/store';
import { Appstate } from './appstate';

export const setAPIStatus = createAction(
  '[API] success or failure status',
  props<{ apiStatus: Appstate }>()
);

export class AppAction {
  type?: string;
  payload?: any;
}
