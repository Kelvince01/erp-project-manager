export interface IEmailSetting {
  ID?: number;
  myGuid?: string;
  Group?: string;
  Subject?: string;
  SenderEmail?: string;
  Username?: string;
  Password?: string;
  OutgoingServer?: string;
  MaxPerHour?: number;
  LastUpdated?: Date;
}
