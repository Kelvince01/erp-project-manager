import { createAction, props } from '@ngrx/store';
import { IDepartment, IDepartmentLite } from './../models/department.model';

export const invokeDepartmentsAPI = createAction(
  '[Departments API] Invoke Departments Fetch API'
);

export const departmentsFetchAPISuccess = createAction(
  '[Departments API] Fetch API Success',
  // props<{ allDepartments: IDepartment[] }>()
  props<{ allDepartments: any }>()
);

export const invokeSaveNewDepartmentAPI = createAction(
  '[Departments API] Invoke save new department api',
  props<{ newDepartment: IDepartment }>()
);

export const saveNewDepartmentAPISuccess = createAction(
  '[Departments API] save new department api success',
  props<{ newDepartment: IDepartment }>()
);

export const invokeUpdateDepartmentAPI = createAction(
  '[Departments API] Invoke update department api',
  props<{ updateDepartment: IDepartment }>()
);

export const updateDepartmentAPISuccess = createAction(
  '[Departments API] update  department api success',
  props<{ updateDepartment: IDepartment }>()
);

export const invokeDeleteDepartmentAPI = createAction(
  '[Departments API] Invoke delete department api',
  props<{ id: number }>()
);

export const deleteDepartmentAPISuccess = createAction(
  '[Departments API] deleted department api success',
  props<{ id: number }>()
);
