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

  constructor(
    private formBuilder: FormBuilder,
    private accountService: BankingService,
    private supplierService: EmployeesService,
    private classOfTransService: ClassOfTransactionService,
    private journalService: JournalsService,
    private itemService: ItemsService
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
}
