export interface IReviewer {
  ReveiwerID?: number;
  UserName?: string;
  Password?: string;
  PasswordQuiz?: number;
  PasswordAnswer?: string;
  FirstName?: string;
  Surname?: string;
  Tel?: string;
  Mobile?: string;
  Email?: string;
  CompanyName?: string;
  POBox?: string;
  Town?: string;
  Country?: string;
  Active?: boolean;
  Accounting?: boolean;
  Payroll?: boolean;
  Inventory?: boolean;
  SalesTracking?: boolean;
  HRM?: boolean;
  GMS?: boolean;
  SACCO?: boolean;
  School?: boolean;
  Clinic?: boolean;
  HotelRestaurant?: boolean;
  Property?: boolean;
  Membership?: boolean;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
}
