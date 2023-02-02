export interface ICompanyInfo {
  CompanyID?: number;
  ProductID?: number;
  CompanyName?: string;
  LegalName?: string;
  CompanyInitials?: string;
  CompanyLogo?: string;
  PINNo?: string;
  VATReg?: boolean;
  GenerateNo?: boolean;
  CurrencyID?: number;
  NSSFNo?: string;
  NHIFNo?: string;
  DateID?: number;
  MonthID?: number;
  FYEnd?: Date;
  VATNo?: string;
  LessThan1Wk?: string;
  LessThan1Month?: string;
  Oneto3Months?: string;
  Threeto12Months?: string;
  Over1Yr?: string;
  ShowToall?: boolean;
  POBox?: string;
  Building?: string;
  Road?: string;
  Town?: string;
  PostalCode?: string;
  EmailAddress?: string;
  Website?: string;
  Tel1?: string;
  Tel2?: string;
  Tel3?: string;
  Mobile1?: string;
  Mobile2?: string;
  Mobile3?: string;
  Fax1?: string;
  Fax2?: string;
  Fax3?: string;
  LatePymtnumberChk?: boolean;
  LatePymtnumber?: Date;
  CommissionChk?: boolean;
  Commission?: Date;
  AgencyChk?: boolean;
  Agency?: Date;
  ContractFeeChk?: boolean;
  ContractFee?: Date;
  OvertimeRateTypeID?: number;
  Rate?: Date;
  wRate?: number;
  WeekdayMornStartTime?: number;
  WeekdayMornEndTime?: number;
  WeekdayAftStartTime?: number;
  WeekdayAftEndTime?: number;
  WeekendMornStartTime?: number;
  WeekendMornEndTime?: number;
  WeekendAftStartTime?: number;
  WeekendAftEndTime?: number;
  HolidayMornStartTime?: number;
  HolidayMornEndTime?: number;
  HolidayAftStartTime?: number;
  HolidayAftEndTime?: number;
  OvertimeChargeable?: boolean;
  OvertimeExpenseAcID?: number;
  MaxOvertimeHrsPerMonth?: number;
  MaxOvertimePerOfWorkHrs?: number;
  AbsenteeHrsDeductFromLeaveDays?: boolean;
  AbsenteeHrsDeductFromOvertime?: boolean;
  MultiCurrency?: boolean;
  NSSFSTDAmt?: Date;
  isEmployerContrPer?: boolean;
  EmployerContr?: Date;
  PettyCashMax?: Date;
  PettyCashMin?: Date;
  CostPerKg?: Date;
  CostPerMeterCube?: Date;
  isPODirect?: boolean;
  Pharmacy?: boolean;
  Grants?: boolean;
  ClosingPeriodID?: Date;
  PostToRetaineddEarnings?: boolean;
  PostToEquity?: boolean;
  DeleteZeroBal?: boolean;
  CarryOverZeroBal?: boolean;
  Finance?: boolean;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
}
