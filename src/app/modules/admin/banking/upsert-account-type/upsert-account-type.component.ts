import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { BankingService } from '@services/banking.service';
import { IAccountType } from '@models/account-type.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-upsert-account-type',
  templateUrl: './upsert-account-type.component.html',
  styleUrls: ['./upsert-account-type.component.css'],
})
export class UpsertAccountTypeComponent implements OnInit {
  id: number = 0;
  accountTypeForm: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  accountType?: IAccountType;

  constructor(
    @Inject(DynamicDialogRef) public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MessageService) public messageService: MessageService,
    public router: Router,
    private bankingService: BankingService
  ) {
    this.accountTypeForm = this.fb.group({
      AccountType: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });
  }

  get f() {
    return this.accountTypeForm.controls;
  }

  saveAccountType() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.accountTypeForm.invalid) return;

    return this.bankingService
      .createAccountType(this.accountTypeForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Account Type saved',
          });
          this.router.navigateByUrl('/admin/banking/add');
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  ngOnInit(): void {}
}
