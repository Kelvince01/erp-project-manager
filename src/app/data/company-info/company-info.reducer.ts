import { createReducer, on } from '@ngrx/store';
import { ICompanyInfo } from '@models/company-info.model';
import {
  companyInfosFetchAPISuccess,
  deleteCompanyInfoAPISuccess,
  saveNewCompanyInfoAPISucess,
  updateCompanyInfoAPISucess,
} from '@company-store/company-info.action';

export const initialState: ReadonlyArray<ICompanyInfo> = [];

export const companyInfoReducer = createReducer(
  initialState,
  on(companyInfosFetchAPISuccess, (state, { allCompanyInfos }) => {
    return allCompanyInfos;
  }),

  on(saveNewCompanyInfoAPISucess, (state, { newCompanyInfo }) => {
    let newState = [...state];
    newState.unshift(newCompanyInfo);
    return newState;
  }),

  on(updateCompanyInfoAPISucess, (state, { updateCompanyInfo }) => {
    let newState = state.filter(
      (_) => _.CompanyID != updateCompanyInfo.CompanyID
    );
    newState.unshift(updateCompanyInfo);
    return newState;
  }),

  on(deleteCompanyInfoAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.CompanyID != id);
    return newState;
  })
);
