import { Component, OnInit } from '@angular/core';
import { ICurrency } from '@models/currency.model';
import { IJournal } from '@models/journal.model';
import { ITransactionType } from '@models/transaction-type.model';
import { CurrenciesService } from '@services/currencies.service';
import { EmployeesService } from '@services/employees.service';
import { FilesService } from '@services/files.service';
import { JournalsService } from '@services/journals.service';
import { TransactionTypesService } from '@services/transaction-types.service';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';

interface IFilterJournal extends IJournal {
  SupplierName?: string;
}

@Component({
  selector: 'app-payments-made',
  templateUrl: './payments-made.component.html',
  styleUrls: ['./payments-made.component.css'],
})
export class PaymentsMadeComponent implements OnInit {
  journals: IFilterJournal[] = [];
  transTypes: ITransactionType[] = [];
  currencies: ICurrency[] = [];
  defaultCurrency = 'Kenyan Shillings';
  loading: boolean = true;

  constructor(
    private journalService: JournalsService,
    private supplierService: EmployeesService,
    private fileService: FilesService,
    private currencyService: CurrenciesService,
    private transService: TransactionTypesService
  ) {}

  columns = [
    { title: 'Bill No', dataKey: 'JournalNo' },
    { title: 'Dated', dataKey: 'Dated' },
    { title: 'Supplier', dataKey: 'SupplierName' },
    { title: 'Amount', dataKey: 'AmtDue' },
    { title: 'Memo', dataKey: 'Memo' },
  ];

  ngOnInit(): void {
    this.getJournals();
    this.getCurrencies();
    this.getTransactionTypes();
  }

  getJournals(_query?: any) {
    let query = {
      TransTypeID: 4,
      TableID: 2,
      AmtDue: {
        $gt: 0,
      },
      ..._query,
    };

    return this.journalService
      .journals$(query)
      .pipe(first())
      .subscribe((res) => {
        res.data.forEach((j: any) => {
          if (j.ProviderID) {
            this.supplierService
              .getById(j.ProviderID)
              .pipe(first())
              .subscribe((res) => {
                j.SupplierName = res.CompanyName;
              });
          } else {
            j.SupplierName = 'Supplier';
          }
        });

        this.journals = res.data;
        this.loading = false;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // ... etc...
  }

  clear(table: Table) {
    table.clear();
  }

  getTransactionTypes() {
    return this.transService
      .transTypes$()
      .pipe(first())
      .subscribe((res) => {
        this.transTypes = res.data;
      });
  }

  getCurrencies() {
    return this.currencyService
      .currencies$()
      .pipe(first())
      .subscribe((res) => {
        this.currencies = res.data;
      });
  }

  exportPdf() {
    this.fileService.exportPdf(this.columns, this.journals, 'Journals List');
  }
}
