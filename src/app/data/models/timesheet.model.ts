export interface ITimeSheet {
  ID?: number;
  EmployeeID?: number;
  ProjectID?: number;
  StartTime?: Date;
  EndTime?: Date;
  StartTimeID?: number;
  EndTimeID?: number;
  Duration?: number;
  Note?: string;
  Approved?: boolean;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
}
