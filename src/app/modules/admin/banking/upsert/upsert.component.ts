import { BankingService } from './../../../../data/services/banking.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '@utils/must-match.validator';
import { first } from 'rxjs';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bankService: BankingService,
    private alertService: MessageService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group(
      {
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
        // password and confirm password only required in add mode
        password: [
          '',
          [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])],
        ],
        confirmPassword: ['', [...(!this.id ? [Validators.required] : [])]],
      },
      {
        validators: MustMatch('password', 'confirmPassword'),
      }
    );

    this.title = 'Add Bank';
    if (this.id) {
      // edit mode
      this.title = 'Edit Bank';
      this.loading = true;
      this.bankService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
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
      ? this.bankService.update(this.id!, this.form.value)
      : this.bankService.create(this.form.value);
  }
}
