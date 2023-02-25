import { CurrenciesService } from '@services/currencies.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { ICurrency } from '@models/currency.model';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.css'],
})
export class AddCurrencyComponent implements OnInit {
  currencyForm: any = FormGroup;
  submitted = false;
  submitting = false;
  currency!: ICurrency;

  constructor(
    private formBuilder: FormBuilder,
    private currencyService: CurrenciesService,
    private messageService: MessageService,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  get f() {
    return this.currencyForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.currencyForm.invalid) return;

    return this.currencyService
      .create(this.currencyForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Currency saved',
          });
          this.router.navigateByUrl('/admin/banking');
          this.ref.close();
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  ngOnInit() {
    this.currencyForm = this.formBuilder.group({
      Currency: ['', [Validators.required]],
      Symbol: ['', [Validators.required]],
      Rate: ['', [Validators.required]],
      isHome: [''],
      AsAtDate: ['', [Validators.required]],
      EndDate: [''],
    });
  }
}
