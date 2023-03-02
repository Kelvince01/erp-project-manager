import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IItemType } from '@models/item-type.model';
import { IItem } from '@models/item.model';
import { ItemsService } from '@services/items.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-upsert-item',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  id: number = 0;
  itemForm!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  item?: IItem;
  itemTypes: IItemType[] = [];
  itemId: any;

  constructor(
    @Inject(DynamicDialogRef) public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MessageService) public messageService: MessageService,
    public router: Router,
    private itemService: ItemsService
  ) {}

  get f() {
    return this.itemForm.controls;
  }

  saveItem() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.itemForm.invalid) return;

    return this.itemService
      .create(this.itemForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Item Saved',
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
    this.getItemTypes();

    this.itemForm = this.fb.group({
      ItemName: ['', [Validators.required]],
      Description: [],
      ItemTypeID: ['', [Validators.required]],
    });
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.itemId = event.target.value;

    this.itemService
      .getTypeById(Number(this.itemId))
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
        this.itemForm.patchValue({ Description: res.Description });
      });
  }

  getItemTypes() {
    let query = {
      ClassOfTrans: 'Service',
    };

    return (
      this.itemService
        // .classOfTransaction$(query)
        .itemTypes$()
        .pipe(first())
        .subscribe((res) => {
          this.itemTypes = res.data;
        })
    );
  }

  closeDialog() {
    this.ref.close();
  }
}
