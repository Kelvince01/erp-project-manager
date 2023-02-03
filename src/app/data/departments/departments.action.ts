import { createAction, props } from '@ngrx/store';
import { IDepartment } from './../models/department.model';

export const invokeDepartmentsAPI = createAction(
  '[Departments API] Invoke Departments Fetch API'
);

export const departmentsFetchAPISuccess = createAction(
  '[Departments API] Fetch API Success',
  // props<{ allDepartments: IDepartment[] }>()
  props<{ allDepartments: any }>()
);

export const invokeSaveNewDepartmentAPI = createAction(
  '[Departments API] Inovke save new department api',
  props<{ newDepartment: IDepartment }>()
);

export const saveNewDepartmentAPISucess = createAction(
  '[Departments API] save new department api success',
  props<{ newDepartment: IDepartment }>()
);

export const invokeUpdateDepartmentAPI = createAction(
  '[Departments API] Inovke update department api',
  props<{ updateDepartment: IDepartment }>()
);

export const updateDepartmentAPISucess = createAction(
  '[Departments API] update  department api success',
  props<{ updateDepartment: IDepartment }>()
);

export const invokeDeleteDepartmentAPI = createAction(
  '[Departments API] Inovke delete department api',
  props<{ id: number }>()
);

export const deleteDepartmentAPISuccess = createAction(
  '[Departments API] deleted department api success',
  props<{ id: number }>()
);
