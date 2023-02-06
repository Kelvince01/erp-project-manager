import { first } from 'rxjs';
import { BankingService } from './../../../../data/services/banking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  banks?: any[];

  constructor(private bankService: BankingService) {}

  ngOnInit() {
    this.bankService
      .get()
      .pipe(first())
      .subscribe((banks) => (this.banks = banks));

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

  deleteBank(id: string) {
    const bank = this.banks!.find((x) => x.id === id);
    bank.isDeleting = true;
    this.bankService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.banks = this.banks!.filter((x) => x.id !== id)));
  }
}
