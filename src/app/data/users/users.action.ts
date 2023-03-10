import { createAction, props } from '@ngrx/store';
import { IUser } from '@models/user.model';

export const invokeUsersAPI = createAction(
  '[Users API] Invoke Users Fetch API'
);

export const usersFetchAPISuccess = createAction(
  '[Users API] Fetch API Success',
  props<{ allUsers: IUser[] }>()
);

export const invokeSaveNewUserAPI = createAction(
  '[Users API] Invoke save new user api',
  props<{ newUser: IUser }>()
);

export const saveNewUserAPISuccess = createAction(
  '[Users API] save new user api success',
  props<{ newUser: IUser }>()
);

export const invokeUpdateUserAPI = createAction(
  '[Users API] Invoke update user api',
  props<{ updateUser: IUser }>()
);

export const updateUserAPISuccess = createAction(
  '[Users API] update  user api success',
  props<{ updateUser: IUser }>()
);

export const invokeDeleteUserAPI = createAction(
  '[Users API] Invoke delete user api',
  props<{ id: number }>()
);

export const deleteUserAPISuccess = createAction(
  '[Users API] deleted user api success',
  props<{ id: number }>()
);
