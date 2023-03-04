import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IITemStatus } from '@models/item-status.model';
import { ItemsService } from '@services/items.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css'],
})
export class AddStatusComponent implements OnInit {
  id: number = 0;
  itemStatusForm!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  classOfTrans?: IITemStatus;

  constructor(
    @Inject(DynamicDialogRef) public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MessageService) public messageService: MessageService,
    public router: Router,
    private itemService: ItemsService
  ) {}

  get f() {
    return this.itemStatusForm.controls;
  }

  saveItemStatus() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.itemStatusForm.invalid) return;

    return this.itemService
      .createStatus(this.itemStatusForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Item Status Saved',
          });
          this.ref.close();
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  ngOnInit(): void {
    this.itemStatusForm = this.fb.group({
      ItemStatus: ['', [Validators.required]],
    });
  }

  closeDialog() {
    this.ref.close();
  }
}
