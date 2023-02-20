import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICompanyInfo } from '../models/company-info.model';

export const selectCompanyInfos =
  // createFeatureSelector<ICompanyInfo[]>('company-info');
  createFeatureSelector<any>('company-info');

export const selectCompanyInfoById = (companyInfoId: number) =>
  createSelector(selectCompanyInfos, (companyInfos: ICompanyInfo[]) => {
    var companyInfobyId = companyInfos.filter(
      (_) => _.CompanyID == companyInfoId
    );
    if (companyInfobyId.length == 0) {
      return null;
    }
    return companyInfobyId[0];
  });

export const areCompanyInfosLoaded = createSelector(
  selectCompanyInfos,
  (state) => state
  // (state) => state.departmantsLoaded
);
