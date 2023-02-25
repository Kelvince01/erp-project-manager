import { AddCountryComponent } from './../add-country/add-country.component';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CountriesService } from '@services/countries.service';
import { BankingService } from '@services/banking.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICountry } from '@models/country.model';
import { first } from 'rxjs';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-upsert-bank',
  templateUrl: './upsert-bank.component.html',
  styleUrls: ['./upsert-bank.component.css'],
})
export class UpsertBankComponent implements OnInit {
  bankForm: any = FormGroup;
  submitted = false;
  submitting = false;
  // countries: ICountry[] = [];
  countries: any;

  constructor(
    private formBuilder: FormBuilder,
    private bankingService: BankingService,
    private countryService: CountriesService,
    private messageService: MessageService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  getCountries() {
    return this.countryService
      .countries$()
      .pipe(first())
      .subscribe((res) => {
        this.countries = res.data;
      });
  }

  get f() {
    return this.bankForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.bankForm.invalid) return;

    return this.bankingService
      .create(this.bankForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Bank saved',
          });
          this.router.navigateByUrl('/admin/banking');
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  ngOnInit() {
    this.getCountries();

    this.bankForm = this.formBuilder.group({
      BankName: ['', [Validators.required]],
      ShortName: ['', [Validators.required]],
      Branch: ['', [Validators.required]],
      SwiftCode: ['', [Validators.required]],
      POBox: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
      Town: ['', [Validators.required]],
      CountryID: ['', [Validators.required]],
    });
  }

  ref: DynamicDialogRef = new DynamicDialogRef();

  addCountry() {
    this.ref = this.dialogService.open(AddCountryComponent, {
      header: 'Add Country',
      width: '60%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((country: ICountry) => {
      if (country) {
        this.getCountries();
        this.messageService.add({
          severity: 'info',
          summary: 'Country Selected',
          detail: country.Country,
        });
      }
    });
  }
}
