export interface IUserAppFunction {
  AppFunctionID?: number;
  SetBy?: string;
  UserID?: number;
  Quotation?: boolean;
  Invoice?: boolean;
  ReceivePayment?: boolean;
  CreditNote?: boolean;
  Refund?: boolean;
  PurchaseOrder?: boolean;
  ReceiveItem?: boolean;
  ReceiveBill?: boolean;
  PayBill?: boolean;
  DebitNote?: boolean;
  CashPurchase?: boolean;
  CashSale?: boolean;
  ReceiveRefund?: boolean;
  LastUpdated?: Date;
  SSMA_TimeStamp?: Date;
}
