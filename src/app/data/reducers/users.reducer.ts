import { Action } from '@ngrx/store';

export interface AppState {
  users: Array<IUser>;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  thumbnail: string;
}

export const ACTIONS = {
  USERS_LOADED: 'USERS_LOADED',
  INCOMING_DATA: 'INCOMING_DATA',
  DELETE_USER: 'DELETE_USER',
};

export function usersReducer(
  state: Array<IUser> = [],
  action: Action
): Array<IUser> {
  switch (action.type) {
    case ACTIONS.INCOMING_DATA:
      action.payload.DELETE.forEach((index) => {
        state.splice(state.indexOf(action.payload), 1);
      });
      return Array.prototype.concat(action.payload.ADD, state);
    case ACTIONS.USERS_LOADED:
      // Return the new state with the payload as users list
      return Array.prototype.concat(action.payload);
    case ACTIONS.DELETE_USER:
      // Remove the element from the array
      state.splice(state.indexOf(action.payload), 1);
      // We need to create another reference
      return Array.prototype.concat(state);
    default:
      return state;
  }
}
