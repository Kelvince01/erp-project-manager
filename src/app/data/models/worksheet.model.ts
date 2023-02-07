export interface IWorkSheet {
  ID?: number;
  EmployeeID?: number;
  ProjectID?: number;
  WorkModeID?: number;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  Note?: string;
  Approved?: boolean;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
}
