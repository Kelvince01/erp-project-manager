export interface IJournal {
  JournalID?: number;
  Dated?: Date;
  DateDue?: Date;
  JournalNo?: string;
  PONo?: string;
  ChequeNo?: string;
  TransTypeID?: number;
  AccountID?: number;
  UnDepositedGrp?: boolean;
  DepositedTo?: boolean;
  ActDepositedTo?: number;
  DrCrID?: number;
  TotalAmt?: number;
  ProviderID?: number;
  CustomerID?: number;
  TenantID?: number;
  LandLordID?: number;
  AmountPaid?: number;
  Balance?: number;
  AmtDue?: number;
  Credits?: number;
  CreditsBF?: number;
  Payment?: number;
  NameID?: number;
  TableID?: number;
  TableName?: string;
  ClassID?: number;
  PymtMethodID?: number;
  Address?: string;
  Memo?: string;
  CustMsg?: string;
  BillRecd?: boolean;
  Billed?: boolean;
  Credit?: boolean;
  InclVAT?: boolean;
  ToBePrinted?: boolean;
  Undeposited?: boolean;
  Delivered?: boolean;
  Paid?: boolean;
  Void?: boolean;
  Refundable?: boolean;
  Refunded?: boolean;
  Reconciled?: boolean;
  Opening?: boolean;
  Posted?: boolean;
  Active?: boolean;
  FYClosed?: boolean;
  ConvertedJID?: number;
  Converted?: boolean;
  IsMemo?: boolean;
  ExchangeRate?: number;
  CurrencyID?: number;
  ForeignCurrency?: boolean;
  CompanyID?: number;
  StaffID?: number;
  Approved?: boolean;
  Edited?: boolean;
  EditedBy?: number;
  ComputerName?: string;
  Locked?: boolean;
  SlipID?: number;
  isReversed?: boolean;
  isReverse?: boolean;
  ProjectID?: number;
  ClientName?: string;
  AmtTendered?: number;
  ChangeDue?: number;
  isForward?: boolean;
  AttachedDocuments?: string;
  PayeeName?: number;
  ChequeIssued?: boolean;
  BankExchangeRate?: number;
  Ailment?: string;
  Diagnosis?: string;
  DocNotes?: string;
  DepartmentID?: number;
  isProformaInvoice?: boolean;
  OnHold?: boolean;
  GrantID?: number;
  isSubGrant?: boolean;
  isActivity?: boolean;
  ObjectiveID?: number;
  MYGUID?: string;
  Level?: number;
  Authorised?: boolean;
  Stamped?: boolean;
  CheckedStatusID?: number;
  CheckedByID?: number;
  CheckedNote?: string;
  CheckedDate?: Date;
  ApprovedStatusID?: number;
  ApprovedByID?: number;
  ApprovedNote?: string;
  ApprovedDate?: Date;
  AuthorisedStatusID?: number;
  AuthorisedByID?: number;
  AuthorisedNote?: string;
  AuthorisedDate?: Date;
  ClearedStatusID?: number;
  ClearedByID?: number;
  ClearedNote?: string;
  ClearedDate?: Date;
  AuditedStatusID?: number;
  AuditedByID?: number;
  AuditedNote?: string;
  AuditedDate?: Date;
  NoteDone?: number;
  DaysRate?: number;
  AmmendID?: number;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
  checked?: boolean;
}
