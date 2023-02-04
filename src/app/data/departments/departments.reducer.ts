import { createReducer, on } from '@ngrx/store';
import { IDepartment } from '../models/department.model';
import {
  deleteDepartmentAPISuccess,
  departmentsFetchAPISuccess,
  saveNewDepartmentAPISuccess as saveNewDepartmentAPISuccess,
  updateDepartmentAPISuccess as updateDepartmentAPISuccess,
} from '../departments/departments.action';

export const initialState: ReadonlyArray<IDepartment> = [];

export const departmentReducer = createReducer(
  initialState,
  on(departmentsFetchAPISuccess, (state, { allDepartments }) => {
    return allDepartments;
  }),

  on(saveNewDepartmentAPISuccess, (state, { newDepartment }) => {
    let newState = [...state];
    newState.unshift(newDepartment);
    return newState;
  }),

  on(updateDepartmentAPISuccess, (state, { updateDepartment }) => {
    let newState = state.filter((_) => _.DepartID != updateDepartment.DepartID);
    newState.unshift(updateDepartment);
    return newState;
  }),

  on(deleteDepartmentAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.DepartID != id);
    return newState;
  })
);
