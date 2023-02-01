import { Action } from '@ngrx/store';

export interface IFilter {
  name: string;
  email: string;
}

export const ACTIONS = {
  UPDATE_FITLER: 'UPDATE_FITLER',
  CLEAR_FITLER: 'CLEAR_FITLER',
};

const initialState = { name: '', email: '' };

export function filterReducer(
  state: IFilter = initialState,
  action: Action
): IFilter {
  switch (action.type) {
    case ACTIONS.UPDATE_FITLER:
      // Create a new state from payload
      return Object.assign({}, action.payload);
    case ACTIONS.CLEAR_FITLER:
      // Create a new state from initial state
      return Object.assign({}, initialState);
    default:
      return state;
  }
}
