import { createReducer, on } from '@ngrx/store';
import { IUser } from '../models/user.model';
import {
  deleteUserAPISuccess,
  usersFetchAPISuccess,
  saveNewUserAPISucess,
  updateUserAPISucess,
} from '../users/users.action';

export const initialState: ReadonlyArray<IUser> = [];

export const userReducer = createReducer(
  initialState,
  on(usersFetchAPISuccess, (state, { allUsers }) => {
    return allUsers;
  }),

  on(saveNewUserAPISucess, (state, { newUser }) => {
    let newState = [...state];
    newState.unshift(newUser);
    return newState;
  }),

  on(updateUserAPISucess, (state, { updateUser }) => {
    let newState = state.filter((_) => _.UsersID != updateUser.UsersID);
    newState.unshift(updateUser);
    return newState;
  }),

  on(deleteUserAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.UsersID != id);
    return newState;
  })
);
