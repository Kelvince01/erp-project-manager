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
