import { UpsertAccountTypeComponent } from './../upsert-account-type/upsert-account-type.component';
import { IMainAccount } from './../../../../data/models/main-account.model';
import { ICurrency } from '@models/currency.model';
import { IAccountType } from './../../../../data/models/account-type.model';
import { BankingService } from './../../../../data/services/banking.service';
import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '@utils/must-match.validator';
import { first } from 'rxjs';
import { CurrenciesService } from '@services/currencies.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  accountTypes: IAccountType[] = [];
  mainAccounts: IMainAccount[] = [];
  currencies: ICurrency[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bankService: BankingService,
    private currencyService: CurrenciesService,
    private alertService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getAccountTypes();
    this.getCurrencies();
    this.getMainAccounts();

    this.form = this.formBuilder.group({
      AccountNo: ['', Validators.required],
      Account: ['', Validators.required],
      Description: ['', Validators.required],
      AccountTypeID: [''],
      SubAccount: [false],
      MainAccount: [''],
      Active: [true],
      OpeningBal: ['', Validators.required],
      BalDate: ['', Validators.required],
      Notes: ['', Validators.required],
      Foreign: [false],
      CurrencyID: [1],
    });

    this.title = 'Add Bank Account';
    if (this.id) {
      // edit mode
      this.title = 'Edit Bank Account';
      this.loading = true;
      this.bankService
        .getAccountById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
  }

  getAccountTypes() {
    this.bankService
      .accountTypes$()
      .pipe(first())
      .subscribe((banks) => (this.accountTypes = banks.data));
  }

  getMainAccounts() {
    this.bankService
      .mainAccounts$()
      .pipe(first())
      .subscribe((mainAccounts) => (this.mainAccounts = mainAccounts.data));
  }

  getCurrencies() {
    this.currencyService
      .currencies$()
      .pipe(first())
      .subscribe((currencies) => (this.currencies = currencies.data));
  }

  isChecked: any;
  isChecked2: any;

  checkValue(event: any) {
    this.isChecked = event.target.checked;
  }

  checkValue2(event: any) {
    this.isChecked2 = event.target.checked;
  }

  ref: DynamicDialogRef = new DynamicDialogRef();

  addAccountType() {
    this.ref = this.dialogService.open(UpsertAccountTypeComponent, {
      header: 'Add Account Type',
      width: '60%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((emailSetting: IAccountType) => {
      if (emailSetting) {
        this.alertService.add({
          severity: 'info',
          summary: 'Product Selected',
          detail: emailSetting.AccountType,
        });
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveBank()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.add({ severity: 'success', detail: 'Bank saved' });
          this.router.navigateByUrl('/admin/banking');
        },
        error: (error) => {
          this.alertService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  private saveBank() {
    // create or update bank based on id param
    return this.id
      ? this.bankService.updateAccount(this.form.value)
      : this.bankService.createAccount(this.form.value);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
