import { Component, Inject, Input, OnInit } from '@angular/core';
import { IAccount } from '@models/account.model';
import { IClassOfTransaction } from '@models/class-of-transaction.model';
import { ISupplier } from '@models/supplier.model';
import { BankingService } from '@services/banking.service';
import { ClassOfTransactionService } from '@services/class-of-transaction.service';
import { EmployeesService } from '@services/employees.service';
import { JournalsService } from '@services/journals.service';
import { first } from 'rxjs';
import { ItemsService } from '@services/items.service';
import { imageLogo } from '../image-logo';
import { FilesService } from '@services/files.service';
import { IJournal } from '@models/journal.model';
import { IAccountPosting } from '@models/account-posting.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { DOCUMENT, formatDate } from '@angular/common';
import { IPaymentMethod } from '@models/payment-method.model';
import { Invoice } from '../create-expense/create-expense.component';

interface PayJournal extends IJournal {}

export class PayInvoice {
  AccountID?: number;
  PaymentAccountID?: number;
  ClassID?: number;
  SupplierID?: number;
  ProjectID?: number;
  AmountPaid?: number;
  Address?: string;
  SupplierName?: string;
  ProjectName?: string;
  ClassName?: string = 'Service';
  RefNo?: string;
  JournalNo?: string;
  Date?: Date = new Date();
  PayableDate?: Date = new Date();
  // Date?: any = new Date().toISOString().substring(0, 10);
  Memo?: string;
  PaymentMethodID?: number;
  ChequeNo?: string;
  IssueCheque?: boolean;
  UnpaidAmountDue?: number;
  UnUsedCredits?: number;
  CreditsBF?: number;

  products: PayJournal[] = [];

  constructor() {
    // Initially one empty product row we will show
    // this.products.push(new PayJournal());
    // this.AmountTotal = Number(
    //   this.products
    //     .reduce((sum, p) => sum + p.Quantity! * p.Rate!, 0)
    //     .toFixed(2)
    // );
    this.Date = new Date();
  }
}

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css'],
})
export class PayBillComponent implements OnInit {
  submitted = false;
  submitting = false;
  accounts: IAccount[] = [];
  paymentAccounts: IAccount[] = [];
  paymentMethods: IPaymentMethod[] = [];
  journals: IJournal[] = [];
  suppliers: ISupplier[] = [];
  classOfTrans: IClassOfTransaction[] = [];
  isCheque: boolean = false;
  items: any;
  itemPosting: any;
  resultDialog: boolean = false;
  user: any;
  refNo: any;
  amountTotal: any;
  employeeId: any;
  amtDue: any;
  amountPaid: any;
  payments: any;
  unpaidAmountPaid: any;
  unusedCredits: any;
  Address: any = '';

  @Input() intialInvoice?: Invoice;
  @Input() invoice = new PayInvoice();

  constructor(
    private accountService: BankingService,
    private supplierService: EmployeesService,
    private classOfTransService: ClassOfTransactionService,
    private journalService: JournalsService,
    private fileService: FilesService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.user = authService.userValue as any;
  }

  ngOnInit() {
    this.getPaymentAccounts();
    this.getSuppliers();
    this.getAccounts();
    this.getPaymentMethods();

    this.refNo = this.createId();
    this.invoice.RefNo = this.refNo;
    this.invoice.Date = new Date();
    this.invoice.PayableDate = new Date();
    this.invoice.CreditsBF = 0.0;

    // this.payExpenseForm.controls.Date.setValue(
    //   formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    // );
  }

  checkAllCheckBox(ev: any) {
    this.invoice.products.forEach((x) => {
      x.checked = ev.target.checked;
    });
  }

  isAllCheckBoxChecked() {
    return this.invoice.products.every((p) => {
      p.checked;
    });
  }

  hideResultDialog() {
    this.resultDialog = false;
    this.invoice = { products: [new PayInvoice()] };
  }

  onSubmit() {
    this.submitted = true;
    const data = () => {
      return {
        JournalNo: this.createId(),
        Dated: this.invoice.Date,
        DateDue: this.invoice.PayableDate,
        TransTypeID: 4,
        AccountID: this.invoice.AccountID,
        TotalAmt: this.invoice.AmountPaid,
        ClassID: 1,
        ProviderID: this.invoice.SupplierID,
        PymtMethodID: 1,
        Address: this.invoice.Address,
        Memo: this.invoice.Memo,
        AmountPaid: 0,
        Balance: 0,
        AmtDue: this.invoice.AmountPaid,
        Credits: 0,
        CreditsBF: 0,
        Payment: 0,
        NameID: this.invoice.SupplierID,
        TableID: 2,
        TableName: 'Supplier',
        UnDepositedGrp: false,
        DepositedTo: false,
        ActDepositedTo: 21,
        DrCrID: 1,
        CustomerID: 0,
        TenantID: 0,
        LandLordID: 0,
        BillRecd: true,
        Billed: true,
        Credit: false,
        InclVAT: true,
        ToBePrinted: true,
        Undeposited: true,
        Delivered: true,
        Paid: false,
        Void: false,
        Refundable: true,
        Refunded: false,
        Reconciled: false,
        Opening: false,
        Posted: true,
        Active: true,
        FYClosed: false,
        ConvertedJID: 0,
        Converted: false,
        IsMemo: false,
        ExchangeRate: 1,
        CurrencyID: 1,
        ForeignCurrency: false,
        CompanyID: 1,
        StaffID: this.user.UsersID,
        Approved: true,
        Edited: false,
        EditedBy: this.user.UsersID,
        ComputerName: this.document.location.hostname,
        Locked: false,
        SlipID: 0,
        isReversed: false,
        isReverse: false,
        ProjectID: this.invoice.ProjectID,
        AmtTendered: 0,
        ChangeDue: 0,
        isForward: false,
        BankExchangeRate: 1,
        DepartmentID: 1,
        GrantID: 1,
        ObjectiveID: 1,
        Level: 0,
        Authorised: true,
        Stamped: true,
        CheckedStatusID: 3,
        CheckedByID: this.user.UsersID,
        CheckedDate: new Date(),
        ApprovedStatusID: 1,
        ApprovedByID: this.user.UsersID,
        AuthorisedStatusID: 1,
        AuthorisedByID: this.user.UsersID,
        ClearedStatusID: 1,
        ClearedByID: this.user.UsersID,
        AuditedStatusID: 1,
        AuditedByID: this.user.UsersID,
        DaysRate: 1,
        AmmendID: 0,
      } as IJournal;
    };

    const actPosting = (journal: any, post: any) => {
      let actPost: IAccountPosting = {
        JournalID: journal.JournalID,
        Description: post.Description,
        JournalBSID: 0,
        JournalPLID: 0,
        JournalNo: journal.JournalNo,
        Dated: new Date(),
        TransTypeID: 4,
        AccountID: 21,
        DrCrID: 2,
        Amount: journal.TotalAmount,
        Posted: true,
        ClosedFY: false,
        NameID: this.invoice.SupplierID,
        TableID: 2,
        TableName: 'Supplier',
        StaffID: this.user.UsersID,
        Reconciled: false,
        ExchangeRate: 1,
        CurrencyID: 1,
        Active: 1,
        CompanyID: 1,
        ClassID: 2,
        Approved: true,
        GrantID: 1,
        Level: 0,
        isBudget: false,
        ProjectID: journal.ProjectID,
        ObjectiveID: 0,
        BudgetCode: '0',
        Frequency: 0,
        Number: 0,
        Rate: 0,
        isProposal: false,
        isDonorBudget: false,
        isOwnerBudget: false,
        isForward: false,
        PayeeNameID: 0,
        ChequeIssued: false,
        BankExchangeRate: 1,
        Authorised: true,
        Stamped: true,
        DaysRate: 1,
        AmmendID: 0,
      };

      return actPost;
    };

    this.submitting = true;

    this.journalService
      .create(data())
      .pipe(first())
      .subscribe((res: any) => {
        this.invoice.products.forEach((item: any) => {
          // if (item.checked) {
          let accountData = actPosting(res.JournalID, item);

          let due = this.calcTotal() - this.invoice.AmountPaid!;

          let upData: Partial<IJournal> = {
            TransTypeID: due <= 0 ? 3 : 4,
            AmtDue: due > 0 ? due : 0,
            // ProviderID: item.ProviderID,
            // TableID: 2,
          };

          this.journalService
            .update(item.JournalID, upData)
            .pipe(first())
            .subscribe((res2) => {
              console.log('Updated!');
            });

          this.accountService
            .createAccountPosting(accountData)
            .pipe(first())
            .subscribe((res3) => {
              console.log('Done');
            });
          // }
        });

        this.messageService.add({
          severity: 'success',
          detail: 'Journal created.',
        });
        this.router.navigateByUrl('/admin/suppliers');

        (error: any) => {
          this.submitting = false;

          this.messageService.add({
            severity: 'error',
            // detail: error,
            detail: 'Could not create journal!',
          });
        };
      });

    this.afterResult();
  }

  afterResult() {
    this.resultDialog = true;
  }

  getPaymentAccounts() {
    let query = {
      AccountTypeID: 6,
    };

    return this.accountService
      .accounts$(query)
      .pipe(first())
      .subscribe((res) => {
        this.paymentAccounts = res.data;
        if (res.total > 0) {
          this.invoice.PaymentAccountID = res.data[0].AccountID;
        }
      });
  }

  getSuppliers() {
    return this.supplierService
      .suppliers$()
      .pipe(first())
      .subscribe((res) => {
        this.suppliers = res.data;
      });
  }

  getAccounts() {
    let query = {
      AccountTypeID: 8,
    };

    return this.accountService
      .accounts$(query)
      .pipe(first())
      .subscribe((res: any) => {
        this.accounts = res.data;
        if (res.total > 0) {
          this.invoice.AccountID = res.data[0].AccountID;
        }
      });
  }

  getPaymentMethods() {
    return this.accountService
      .paymentMethods$()
      .pipe(first())
      .subscribe((res) => {
        this.paymentMethods = res.data;
      });
  }

  getJournals(supplierId: any) {
    let query = {
      TransTypeID: 4,
      ProviderID: supplierId,
      TableID: 2,
      AmtDue: {
        $gt: 0,
      },
    };

    return this.journalService
      .journals$(query)
      .pipe(first())
      .subscribe((res) => {
        this.invoice.products = res.data;

        // this.invoice.products.forEach((journal: IJournal) => {
        let total = this.invoice.products
          .reduce((sum, p) => sum + p.TotalAmt!, 0)
          .toFixed(2);
        // })
        this.amountTotal = total;
        // this.payExpenseForm.patchValue({ AmountPaid: this.amountTotal });
      });
  }

  paymentChanged(e: any, index: any) {
    // this.payments = +this.invoice.products[index].Payment!;
    this.invoice.products[index].AmtDue =
      this.invoice.products[index].AmtDue! -
      this.invoice.products[index].Payment!;
    this.invoice.AmountPaid = this.payments;
    if (this.invoice.products[index].Payment! > 0) {
      this.invoice.products[index].checked;
    }

    this.calcTotalPaid();
    this.invoice.UnpaidAmountDue = this.calcTotal() - this.invoice.AmountPaid!;
    let unused = this.invoice.AmountPaid! - this.calcTotal();
    this.invoice.UnUsedCredits = unused > 0 ? unused : 0;
  }

  calcTotalPaid() {
    this.invoice.AmountPaid = Number(
      this.invoice.products.reduce((sum, p) => sum + p.Payment!, 0).toFixed(2)
    );
  }

  calcTotal() {
    return Number(
      this.invoice.products.reduce((sum, p) => sum + p.TotalAmt!, 0).toFixed(2)
    );
  }

  itemSelectChangeHandler(event: any) {
    //update the ui
    let id = event.target.value;
    if (id == 2) {
      this.isCheque = true;
    } else {
      this.isCheque = false;
    }
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.employeeId = event.target.value;

    this.supplierService
      .getById(Number(this.employeeId))
      .pipe(first())
      .subscribe((res) => {
        let address = `${res.POBox + ', ' ? res.POBox : ''} ${
          res.PostalCode + ', ' ? res.PostalCode : ''
        }, ${res.Estate + ', ' ? res.Estate : ''}, ${res.Town ? res.Town : ''}`;

        this.invoice.Address = address;
        this.invoice.SupplierName = res.CompanyName;
      });

    this.getJournals(this.employeeId);
  }

  async generatePDF(action = 'open') {
    let docDefinition: any = {
      content: [
        {
          image: imageLogo,
          margin: [0, 20, 0, 0],
          alignment: 'center',
          width: 100,
        },
        {
          text: 'ONSTER GROUP LIMITED',
          fontSize: 16,
          margin: [0, 20, 0, 0],
          alignment: 'center',
          color: 'blue',
        },
        {
          text: 'Expenses Report',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'black',
        },
        {
          columns: [
            [
              {
                text: 'Church Building',
                bold: true,
              },
              { text: 'Birongo Road' },
              { text: 'P.O Box 19324, 00202 Nairobi' },
              { text: 'Tel +254 724 57 99 26' },
            ],
            [
              {
                text: `PIN No : ${(Math.random() * 1000).toFixed(0)}`,
                alignment: 'right',
              },
              {
                text: `VAT No : ${(Math.random() * 2000).toFixed(0)}`,
                alignment: 'right',
              },
              {
                text: `Website : onstergroup.co.ke`,
                alignment: 'right',
              },
              {
                text: `Email : onstergroup@gmail.com`,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: 'Billed',
          style: 'sectionHeader',
        },
        {
          columns: [
            [
              // {
              //   text: `Project: ${this.invoice?.ProjectID}`,
              //   bold: true,
              // },
              { text: `Class: ${this.invoice?.ClassName}` },
              { text: `Supplier: ${this.invoice?.SupplierName}` },
              { text: `Amount: ${this.invoice?.AmountPaid}` },
              {
                text: `Address: ${this.invoice?.Address}`,
                margin: [0, 0, 0, 10],
              },
            ],
            [
              {
                text: `Expenses Report: ${(Math.random() * 1000).toFixed(0)}`,
                alignment: 'right',
              },
              {
                text: `Date : ${new Date().toLocaleString()}`,
                alignment: 'right',
              },
              {
                text: `Currency : ${'Kenya Shillings'}`,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                'Expense Item',
                'Quantity',
                'Rate',
                'Amount',
                'Tax Tax Amount',
                'Total Amount',
              ],
              ...this.invoice.products.map((p) => [
                p.TableName,
                1, // p.Quantity,
                p.AmtDue,
                p.TotalAmt!.toFixed(2),
                1,
                p.TotalAmt!.toFixed(2),
              ]),
              [
                { text: 'Total Amount', colSpan: 3 },
                {},
                {},
                {},
                {},
                this.invoice.products
                  .reduce((sum, p) => sum + p.TotalAmt!, 0)
                  .toFixed(2),
              ],
            ],
          },
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
          color: 'red',
        },
      },
    };

    if (action === 'download') {
      (await this.fileService.createPdf(docDefinition)).download();
    } else if (action === 'print') {
      (await this.fileService.createPdf(docDefinition)).print();
    } else {
      (await this.fileService.createPdf(docDefinition)).open();
    }
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
