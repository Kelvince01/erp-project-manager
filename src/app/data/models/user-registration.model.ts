export interface IUserRegistration {
  RegID?: number;
  FirstName?: string;
  Surname?: string;
  CompanyName?: string;
  FloorBuilding?: string;
  Street?: string;
  POBox?: string;
  PostalCode?: string;
  Town?: string;
  Country?: string;
  Tel?: string;
  Mobile?: string;
  Email?: string;
  Website?: string;
  Fax?: string;
  SellerCode?: string;
  Registered?: boolean;
  DateRegistered?: Date;
  PrimaryMachine?: boolean;
  PrimaryMAC?: string;
  MAC?: string;
  osName?: string;
  osVersion?: string;
  HDDSNo?: string;
  cManufacturer?: string;
  cModel?: string;
  SysType?: string;
  cpuID?: string;
  cpuName?: string;
  cpuManufacturer?: string;
  cpuVersion?: string;
  LicenseKey?: string;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
}