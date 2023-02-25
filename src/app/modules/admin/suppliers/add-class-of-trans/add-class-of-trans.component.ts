import { ClassOfTransactionService } from '@services/class-of-transaction.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IClassOfTransaction } from '@models/class-of-transaction.model';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-class-of-trans',
  templateUrl: './add-class-of-trans.component.html',
  styleUrls: ['./add-class-of-trans.component.css'],
})
export class AddClassOfTransComponent implements OnInit {
  id: number = 0;
  classOfTransForm: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  classOfTrans?: IClassOfTransaction;

  constructor(
    @Inject(DynamicDialogRef) public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MessageService) public messageService: MessageService,
    public router: Router,
    private classOfTransService: ClassOfTransactionService
  ) {
    this.classOfTransForm = this.fb.group({
      ClassOfTrans: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });
  }

  get f() {
    return this.classOfTransForm.controls;
  }

  saveClassOfTrans() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.classOfTransForm.invalid) return;

    return this.classOfTransService
      .create(this.classOfTransForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Class of transaction saved',
          });
          this.router.navigateByUrl('/admin/suppliers/create-expense');
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  ngOnInit(): void {}
}
