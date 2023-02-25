import { ICurrency } from './../../../../data/models/currency.model';
import { AddCurrencyComponent } from './../add-currency/add-currency.component';
import { first } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BankingService } from '@services/banking.service';
import { IAccount } from '@models/account.model';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-list-bank-accounts',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  banks: IAccount[] = [];
  isDeleting = false;

  constructor(
    private bankService: BankingService,
    public router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getBankAccounts();

    /*
      getLasDropDownOptions(refresh) {
  return this.getLasData(refresh).pipe(
    takeUntil(this.unsubscribe),
    map((response: any[]) => {
      return response.map((las) => {
        las.displayValue = las.name + " - " + las.expression;
        if (!las.status) {
          las.disabled = true;
          las.category = "Calculating";
        } else {
          las.category = las.longterm ? "Online Range" : "Short Term";
        }
        return las;
      });
    })
  );
}*/
  }

  getBankAccounts() {
    this.bankService
      .accounts$()
      .pipe(first())
      .subscribe((banks) => (this.banks = banks.data));
  }

  getAccountTypes() {
    this.bankService
      .accountTypes$()
      .pipe(first())
      .subscribe((banks) => (this.banks = banks.data));
  }

  ref: DynamicDialogRef = new DynamicDialogRef();

  addCurrency() {
    this.ref = this.dialogService.open(AddCurrencyComponent, {
      header: 'Add Currency',
      width: '60%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((currency: ICurrency) => {
      if (currency) {
        this.messageService.add({
          severity: 'info',
          summary: 'Currency Selected',
          detail: currency.Currency,
        });
      }
    });
  }

  deleteBank(bank: IAccount) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + bank.AccountNo + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isDeleting = true;
        this.bankService
          .deleteAccount(bank.AccountID!)
          .pipe(first())
          .subscribe(
            () =>
              (this.banks = this.banks!.filter(
                (x) => x.AccountID !== bank.AccountID
              ))
          );
        this.isDeleting = false;
        this.getBankAccounts();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Bank Deleted',
          life: 3000,
        });
      },
    });
  }
}
