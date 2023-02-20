import { createAction, props } from '@ngrx/store';
import { ICompanyInfo } from '../models/company-info.model';

export const invokeCompanyInfosAPI = createAction(
  '[CompanyInfos API] Invoke CompanyInfos Fetch API'
);

export const companyInfosFetchAPISuccess = createAction(
  '[CompanyInfos API] Fetch API Success',
  // props<{ allCompanyInfos: ICompanyInfo[] }>()
  props<{ allCompanyInfos: any }>()
);

export const invokeSaveNewCompanyInfoAPI = createAction(
  '[CompanyInfos API] Inovke save new company info api',
  props<{ newCompanyInfo: ICompanyInfo }>()
);

export const saveNewCompanyInfoAPISucess = createAction(
  '[CompanyInfos API] save new company info api success',
  props<{ newCompanyInfo: ICompanyInfo }>()
);

export const invokeUpdateCompanyInfoAPI = createAction(
  '[CompanyInfos API] Inovke update company info api',
  props<{ updateCompanyInfo: ICompanyInfo }>()
);

export const updateCompanyInfoAPISucess = createAction(
  '[CompanyInfos API] update  company info api success',
  props<{ updateCompanyInfo: ICompanyInfo }>()
);

export const invokeDeleteCompanyInfoAPI = createAction(
  '[CompanyInfos API] Inovke delete company info api',
  props<{ id: number }>()
);

export const deleteCompanyInfoAPISuccess = createAction(
  '[CompanyInfos API] deleted company info api success',
  props<{ id: number }>()
);
