import { IItem } from './../../../../data/models/item.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css'],
})
export class PayBillComponent implements OnInit {
  payExpenseForm: any = FormGroup;
  submitted = false;
  accounts: IAccount[] = [];
  paymentAccounts: IAccount[] = [];
  paymentMethods: IAccount[] = [];
  suppliers: ISupplier[] = [];
  classOfTrans: IClassOfTransaction[] = [];
  isCheque: boolean = false;
  // items: IItem[] = [];
  items: any;
  itemPosting: any;
  resultDialog: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: BankingService,
    private supplierService: EmployeesService,
    private classOfTransService: ClassOfTransactionService,
    private journalService: JournalsService,
    private itemService: ItemsService,
    private fileService: FilesService
  ) {}

  //Add user form actions
  get f() {
    return this.payExpenseForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.payExpenseForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      alert('Great!!');
    }
  }

  ngOnInit() {
    this.getPaymentAccounts();
    this.getSuppliers();
    this.getClassOfTrans();
    this.getAccounts();

    //Add form validations
    this.payExpenseForm = this.formBuilder.group({
      AccountID: ['', [Validators.required]],
      SupplierID: ['', [Validators.required]],
      AmountPaid: ['', [Validators.required]],
      PaymentAccountID: ['', [Validators.required]],
      RefNo: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      PayableDate: ['', [Validators.required]],
      PaymentMethodID: ['', [Validators.required]],
      ChequeNo: [''],
      IssueCheque: [''],
      UnpaidAmountDue: [''],
      UnUsedCredits: [''],
      CreditsBF: [''],
      Memo: [''],
    });
  }

  getPaymentAccounts() {
    let query = {
      AccountTypeID: 6,
    };

    return this.accountService
      .accounts$()
      .pipe(first())
      .subscribe((res) => {
        this.accounts = res.data;
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

  getClassOfTrans() {
    let query = {
      ClassOfTrans: 'Service',
    };

    return this.classOfTransService
      .classOfTransaction$(query)
      .pipe(first())
      .subscribe((res) => {
        this.classOfTrans = res.data;
      });
  }

  getAccounts() {
    let query = {
      AccountTypeID: 8,
    };

    return this.accountService
      .accounts$()
      .pipe(first())
      .subscribe((res) => {
        this.accounts = res.data;
      });
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
              // ['Item', 'Rate', 'Quantity', 'Amount'],
              // ...this.invoice.products.map((p) => [
              //   p.ItemName,
              //   p.Rate,
              //   p.Quantity,
              //   (p.Rate! * p.Quantity!).toFixed(2),
              // ]),
              // [
              //   { text: 'Total Amount', colSpan: 3 },
              //   {},
              //   {},
              //   this.invoice.products
              //     .reduce((sum, p) => sum + p.Quantity! * p.Rate!, 0)
              //     .toFixed(2),
              // ],
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
  }
}
