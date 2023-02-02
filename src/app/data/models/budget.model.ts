export interface IBudget {
  BudgetID?: number;
  ProjBudgetID?: number;
  ProjectID?: number;
  ObjectiveID?: number;
  ActivityID?: number;
  ClassificationID?: number;
  AccountID?: number;
  BudgetCode?: string;
  BudgetLine?: string;
  Description?: string;
  Frequency?: number;
  Number?: number;
  Rate?: number;
  Amount?: number;
  isProposal?: boolean;
  isDonorBudget?: boolean;
  isOwnerBudget?: boolean;
  Dated?: Date;
  StaffID?: number;
  SuppAmount?: number;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
}
