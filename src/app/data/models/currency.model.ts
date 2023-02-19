export interface ICurrency {
  CurrencyID?: number;
  myGuid?: string;
  Currency?: string;
  Symbol?: string;
  Rate?: number;
  isHome?: boolean;
  Forward?: boolean;
  AsAtDate?: Date;
  AverageRate?: number;
  EndDate?: Date;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
}
