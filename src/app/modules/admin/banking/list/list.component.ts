import { IBank } from '@models/bank.model';
import { first } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BankingService } from '@services/banking.service';
import { IAccount } from '@models/account.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  banks: IAccount[] = [];
  isDeleting = false;

  constructor(private bankService: BankingService) {}

  ngOnInit() {
    this.getBanks();

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

  getBanks() {
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

  deleteBank(bank: IAccount) {
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
    this.isDeleting = true;
  }
}
