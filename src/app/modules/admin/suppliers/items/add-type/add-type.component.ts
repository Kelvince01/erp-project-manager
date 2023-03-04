import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IItemType } from '@models/item-type.model';
import { ItemsService } from '@services/items.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css'],
})
export class AddTypeComponent implements OnInit {
  id: number = 0;
  itemTypeForm!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  itemType?: IItemType;

  constructor(
    @Inject(DynamicDialogRef) public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MessageService) public messageService: MessageService,
    public router: Router,
    private itemService: ItemsService
  ) {}

  get f() {
    return this.itemTypeForm.controls;
  }

  saveItemType() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.itemTypeForm.invalid) return;

    return this.itemService
      .createType(this.itemTypeForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Item Type Saved',
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
    this.itemTypeForm = this.fb.group({
      ItemType: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });
  }

  closeDialog() {
    this.ref.close();
  }
}
