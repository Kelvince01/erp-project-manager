import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser } from '../models/user.model';

export const selectUsers = createFeatureSelector<IUser[]>('users');

export const selectUserById = (userId: number) =>
  createSelector(selectUsers, (users: IUser[]) => {
    var userbyId = users.filter((_) => _.UsersID == userId);
    if (userbyId.length == 0) {
      return null;
    }
    return userbyId[0];
  });

// export const areUsersLoaded = createSelector(
//   selectUsers,
//   (state) => state
//   // (state) => state.departmantsLoaded
// );
