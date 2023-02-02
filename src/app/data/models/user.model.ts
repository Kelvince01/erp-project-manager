export interface IUser {
  UsersID?: number;
  Username?: string;
  FirstName?: string;
  Surname?: string;
  Password?: string;
  Email?: string;
  GroupID?: number;
  RoleID?: number;
  DepartmentID?: number;
  SectionID?: number;
  LastLogin?: string;
  Duration?: string;
  LoginPoint?: string;
  EmployeeID?: number;
  LastUpdated?: Date;
}

export interface IFilter {
  name: string;
  email: string;
}
