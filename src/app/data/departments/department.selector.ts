import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IDepartment } from '@models/department.model';

export const selectDepartments = createFeatureSelector<any>('departments');
// createFeatureSelector<IDepartment[]>('departments');

export const selectDepartmentById = (departmentId: number) =>
  createSelector(selectDepartments, (departments: IDepartment[]) => {
    var departmentbyId = departments.filter((_) => _.DepartID == departmentId);
    if (departmentbyId.length == 0) {
      return null;
    }
    return departmentbyId[0];
  });

// export const areDepartmentsLoaded = createSelector(
//   selectDepartments,
//   (state) => state
//   // (state) => state.departmantsLoaded
// );
