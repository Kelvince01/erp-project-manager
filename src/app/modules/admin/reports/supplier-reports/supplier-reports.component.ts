import { EmployeesService } from '@services/employees.service';
import { Component, OnInit } from '@angular/core';
import { IJournal } from '@models/journal.model';
import { JournalsService } from '@services/journals.service';
import { first } from 'rxjs';
import { FilesService } from '@services/files.service';
import { Table } from 'primeng/table';
import { CurrenciesService } from '@services/currencies.service';
import { ICurrency } from '@models/currency.model';
import { ITransactionType } from '@models/transaction-type.model';
import { TransactionTypesService } from '@services/transaction-types.service';
import { FormControl, FormGroup } from '@angular/forms';

interface IFilterJournal extends IJournal {
  SupplierName?: string;
}

@Component({
  selector: 'app-supplier-reports',
  templateUrl: './supplier-reports.component.html',
  styleUrls: ['./supplier-reports.component.css'],
})
export class SupplierReportsComponent implements OnInit {
  journals: IFilterJournal[] = [];
  transTypes: ITransactionType[] = [];
  currencies: ICurrency[] = [];
  defaultCurrency = 'Kenyan Shillings';
  loading: boolean = true;
  query = {};
  searchBillsForm!: FormGroup;

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

    this.searchBillsForm = new FormGroup({
      TransTypeID: new FormControl(),
      CurrencyID: new FormControl(),
      DateDueFrom: new FormControl(),
      DateDueTo: new FormControl(),
    });
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

  clearSearchForm() {
    this.searchBillsForm.reset();
    this.getJournals();
  }

  selectChangeHandler(event: any) {
    //update the ui
    let value = event.target.value;

    if (
      event.target.attributes.getNamedItem('ng-reflect-name').value ==
      'TransTypeID'
    ) {
      this.query = {
        ...this.query,
        TransTypeID: value,
      };
    }
    if (
      event.target.attributes.getNamedItem('ng-reflect-name').value ==
      'CurrencyID'
    ) {
      this.query = {
        ...this.query,
        CurrencyID: value,
      };
    }
    if (
      event.target.attributes.getNamedItem('ng-reflect-name').value ==
      'DateDueFrom'
    ) {
      this.query = {
        ...this.query,
        DateDue: {
          $gte: value,
        },
      };
    }
    if (
      event.target.attributes.getNamedItem('ng-reflect-name').value ==
      'DateDueTo'
    ) {
      this.query = {
        ...this.query,
        DateDue: {
          $lte: value,
        },
      };
    }

    this.getJournals(this.query);
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
