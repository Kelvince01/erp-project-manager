export interface IDepartment {
  DepartID?: number | any;
  CompanyID?: number;
  Department?: string;
  HOD?: string;
  Description?: string;
  LastUpdated?: Date;
}

export interface IDepartmentLite extends Omit<IDepartment, 'DepartID'> {}
