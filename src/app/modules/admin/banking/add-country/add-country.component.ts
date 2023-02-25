import { CountriesService } from '@services/countries.service';
import { ICountry } from '@models/country.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
})
export class AddCountryComponent implements OnInit {
  id: number = 0;
  countryForm: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  country?: ICountry;

  constructor(
    @Inject(DynamicDialogRef) public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MessageService) public messageService: MessageService,
    public router: Router,
    private countryService: CountriesService
  ) {
    this.countryForm = this.fb.group({
      Country: ['', [Validators.required]],
      Code: ['', [Validators.required]],
    });
  }

  get f() {
    return this.countryForm.controls;
  }

  saveCountry() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.countryForm.invalid) return;

    return this.countryService
      .create(this.countryForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Country saved',
          });
          this.router.navigateByUrl('/admin/banking/add-bank');
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  ngOnInit(): void {}
}
