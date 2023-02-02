export interface IEmail {
  EmailID?: number;
  ClientID?: number;
  NameID?: number;
  TableName?: string;
  toAddress?: string;
  ccAddress?: string;
  bcAddress?: string;
  Priority?: string;
  attachedFile?: string;
  emailBody?: string;
  emailSubject?: string;
  fromAddress?: string;
  DateSent?: Date;
  CompanyID?: number;
}
