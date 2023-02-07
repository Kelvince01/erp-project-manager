export interface IUserBanking {
  BankingID?: number;
  SetBy?: string;
  RoleID?: number;
  Banking_?: boolean;
  WriteCheque_?: boolean;
  BankTransfer_?: boolean;
  BankReconciliation_?: boolean;
  BankStatement_?: boolean;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
}
