import { IAccount } from '@models/account.model';
import { EmployeesService } from '@services/employees.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ClassOfTransactionService } from '@services/class-of-transaction.service';
import { BankingService } from '@services/banking.service';
import { JournalsService } from '@services/journals.service';
import { first } from 'rxjs';
import { ISupplier } from '@models/supplier.model';
import { IClassOfTransaction } from '@models/class-of-transaction.model';
import { IProject } from '@models/project.model';
import { ProjectsService } from '@services/projects.service';
import { IItem } from '@models/item.model';
import { ItemsService } from '@services/items.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { imageLogo } from '../image-logo';
import { FilesService } from '@services/files.service';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { DOCUMENT } from '@angular/common';
import { IJournalBS } from '@models/journal-bs.model';
import { IJournal } from '@models/journal.model';
import { IAccountPosting } from '@models/account-posting.model';
// import {DOCUMENT} from '@angular/platform-browser';

class Product {
  ItemName?: string;
  ItemID?: number;
  Description?: string;
  Rate?: number;
  Quantity?: number = 1.0;
  AmountTotal?: number;
  Tax?: number;
  CurrentRate?: number;
}

class Invoice {
  AccountID?: number;
  ClassID?: number;
  SupplierID?: number;
  ProjectID?: number;
  AmountTotal?: number;
  Address?: string;
  RefNo?: string;
  JournalNo?: string;
  Date?: Date;
  Memo?: string;

  products: Product[] = [];

  constructor() {
    // Initially one empty product row we will show
    this.products.push(new Product());
    this.AmountTotal = Number(
      this.products
        .reduce((sum, p) => sum + p.Quantity! * p.Rate!, 0)
        .toFixed(2)
    );
    this.Date = new Date();
  }
}

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent implements OnInit {
  submitted = false;
  submitting = false;
  expense: any;
  suppliers: ISupplier[] = [];
  classOfTrans: IClassOfTransaction[] = [];
  accounts: IAccount[] = [];
  projects: IProject[] = [];
  items: IItem[] = [];
  employeeId: any;
  itemId: any;

  submittedItem = false;
  itemDialog: boolean = false;
  resultDialog: boolean = false;
  item: any;
  itemData: any[] = [];

  invoice = new Invoice();
  user: any;
  ItemByName: any;

  constructor(
    private supplierService: EmployeesService,
    private classOfTransService: ClassOfTransactionService,
    private accountService: BankingService,
    private journalService: JournalsService,
    private projectService: ProjectsService,
    private itemService: ItemsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileService: FilesService,
    private router: Router,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.user = authService.userValue as any;
    let url =
      document.location.protocol +
      '//' +
      document.location.hostname +
      ':my_port';
  }

  ngOnInit() {
    this.getSuppliers();
    this.getClassOfTrans();
    this.getAccounts();
    this.getProjects();
    this.getItems();

    this.invoice.RefNo = this.createId();
    this.invoice.JournalNo = this.createId();

    // console.log(this.invoice);
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.invoice);

    let data: IJournal = {
      JournalNo: this.invoice.JournalNo,
      Dated: new Date(),
      DateDue: new Date(),
      TransTypeID: 4,
      AccountID: this.invoice.AccountID,
      TotalAmt: this.invoice.AmountTotal,
      ClassID: this.invoice.ClassID,
      ProviderID: this.invoice.SupplierID,
      PymtMethodID: 1,
      Address: this.invoice.Address,
      Memo: this.invoice.Memo,
      AmountPaid: 0,
      Balance: 0,
      AmtDue: this.invoice.AmountTotal,
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
      // [Level:]	0,
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
    };

    const journalBsData = (id: any, item: Product) => {
      let itemBs: IJournalBS = {
        JournalID: id,
        ItemID: item.ItemID,
        Description: item.Description,
        Quan: item.Quantity,
        QuanDelivered: 0,
        QuantsNow: 0,
        Rate: item.Rate,
        ExchangeRate: 1,
        CurrencyID: 1,
        ForeignCurrency: false,
        Amount: this.invoice.AmountTotal,
        TaxID: 1,
        TaxAmt: 0,
        AccountID: 30,
        DrCrID: 1,
        TransTypeID: 4,
        Reconciled: false,
        PackedWeight: 0,
        PackedVolume: 0,
        DeliveryModeID: 1,
        ProjectID: this.invoice.ProjectID,
        PatientID: 0,
        GrantID: 0,
        // [Level:]	1,
        AmtDue: 0,
        QuanBal: 0,
      };

      return itemBs;
    };

    const actPosting = (id: any, post: Product) => {
      let actPost: IAccountPosting = {
        JournalID: id,
        Description: post.Description,
        JournalBSID: 0,
        JournalPLID: 0,
        JournalNo: this.invoice.JournalNo,
        Dated: new Date(),
        TransTypeID: 4,
        AccountID: 21,
        DrCrID: 2,
        Amount: this.invoice.AmountTotal,
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
        //: [Level,	0	0
        isBudget: false,
        ProjectID: this.invoice.ProjectID,
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
      .create(data)
      .pipe(first())
      .subscribe((res: any) => {
        this.invoice.products.forEach((item: any) => {
          let itemData = journalBsData(res.JournalID, item);
          let accountData = actPosting(res.JournalID, item);

          this.journalService
            .createBS(itemData)
            .pipe(first())
            .subscribe((res) => {
              console.log('Done');
            });

          this.accountService
            .createAccountPosting(accountData)
            .pipe(first())
            .subscribe((res) => {
              console.log('Done');
            });
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
            detail: error,
            // detail: 'Could not create journal!',
          });
        };
      });

    this.afterResult();
  }

  openNewItem() {
    this.item = {};
    this.submitted = false;
    this.itemDialog = true;
  }

  afterResult() {
    this.resultDialog = true;
  }

  calcTotal(event?: any) {
    this.invoice.AmountTotal = Number(
      this.invoice.products
        .reduce((sum, p) => sum + p.Quantity! * p.Rate!, 0)
        .toFixed(2)
    );
  }

  getSuppliers() {
    return this.supplierService
      .suppliers$()
      .pipe(first())
      .subscribe((res) => {
        this.suppliers = res.data;
      });
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
      });
  }

  getItemByName(data: any) {
    let query = {
      ItemName: data,
      $limit: 1,
    };

    return this.itemService.items$(query);
  }

  itemSelectChangeHandler(event: any, data: any) {
    //update the ui
    this.itemId = event.target.value;

    this.getItemByName(this.itemId)
      .pipe(first())
      .subscribe((res) => {
        this.invoice.products[data].Rate = res.data[0].Cost;
        this.invoice.products[data].ItemID = res.data[0].ItemID;
        this.invoice.products[data].Description = res.data[0].SalesDesc;

        this.calcTotal();
      });
  }

  getClassOfTrans() {
    let query = {
      ClassOfTrans: 'Service',
    };

    return this.classOfTransService
      .classOfTransaction$(query)
      .pipe(first())
      .subscribe((res) => {
        this.classOfTrans = res.data;
        this.invoice.ClassID = this.classOfTrans[0].ClassID;
      });
  }

  getAccounts() {
    let query = {
      AccountTypeID: 8,
    };

    return this.accountService
      .accounts$(query)
      .pipe(first())
      .subscribe((res) => {
        this.accounts = res.data;
        this.invoice.AccountID = this.accounts[0].AccountID;
      });
  }

  getProjects() {
    return this.projectService
      .projects$()
      .pipe(first())
      .subscribe((res) => {
        this.projects = res.data;
      });
  }

  getItems() {
    return this.itemService
      .items$()
      .pipe(first())
      .subscribe((res) => {
        this.items = res.data;
      });
  }

  hideDialog() {
    this.itemDialog = false;
    this.submittedItem = false;
  }

  hideResultDialog() {
    this.resultDialog = false;
    this.invoice = { products: [new Product()] };
  }

  saveProduct() {
    this.submittedItem = true;

    this.item.id = this.createId();
    this.itemData.push(this.item);

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Created',
      life: 3000,
    });

    this.itemDialog = false;
    this.item = {};
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
          text: 'Supplier Payments',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Item', 'Rate', 'Quantity', 'Amount'],
              ...this.invoice.products.map((p) => [
                p.ItemName,
                p.Rate,
                p.Quantity,
                (p.Rate! * p.Quantity!).toFixed(2),
              ]),
              [
                { text: 'Total Amount', colSpan: 3 },
                {},
                {},
                this.invoice.products
                  .reduce((sum, p) => sum + p.Quantity! * p.Rate!, 0)
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

    this.resultDialog = false;
    this.invoice = { products: [new Product()] };
  }

  addProduct() {
    this.invoice.products.push(new Product());
  }
}
