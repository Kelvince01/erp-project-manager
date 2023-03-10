export interface IAccount {
  AccountID?: number;
  myGuid?: string;
  AccountNo?: string;
  Account?: string;
  Description?: string;
  ReservedAc?: boolean;
  AccountTypeID?: number;
  SubAccount?: boolean;
  MainAccount?: number;
  Active?: boolean;
  BankAcNo?: string;
  Bank?: string;
  OpeningBal?: number;
  BalDate?: Date;
  Notes?: string;
  TaxID?: number;
  AccountDetails?: string;
  Foreign?: boolean;
  CurrencyID?: number;
  ExchangeRate?: number;
  CompanyID?: number;
  ProjectID?: number;
  Frequency?: number;
  Number?: number;
  Rate?: number;
  Amount?: number;
  isProposal?: boolean;
  isDonorBudget?: boolean;
  isOwnerBudget?: boolean;
  LastEdited?: Date;
  SSMA_TimeStamp?: Date;
}
