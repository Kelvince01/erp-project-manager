import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IItem } from '@models/item.model';
import { FilesService } from '@services/files.service';
import { ItemsService } from '@services/items.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { UpsertComponent } from '../upsert/upsert.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  items!: IItem[];
  isDeleting = false;

  constructor(
    private itemService: ItemsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileService: FilesService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    return this.itemService
      .items$()
      .pipe(first())
      .subscribe((items: any) => (this.items = items.data));
  }

  ref: DynamicDialogRef = new DynamicDialogRef();

  addItem(item?: any) {
    if (item) {
      this.ref = this.dialogService.open(UpsertComponent, {
        header: 'Edit Item',
        width: '80%',
        contentStyle: { 'max-height': '800px', overflow: 'auto' },
        baseZIndex: 10000,
        data: { item: item },
      });
    } else {
      this.ref = this.dialogService.open(UpsertComponent, {
        header: 'Add Item',
        width: '80%',
        contentStyle: { 'max-height': '800px', overflow: 'auto' },
        baseZIndex: 10000,
      });
    }

    this.ref.onClose.subscribe((currItem: IItem) => {
      if (currItem) {
        this.messageService.add({
          severity: 'info',
          summary: 'Item Selected',
          detail: currItem.ItemName,
        });
      }
    });
  }

  deleteItem(item: IItem) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + item.ItemName + ' item ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isDeleting = true;
        this.itemService.delete(Number(item.ItemID!)).pipe(first()).subscribe();
        this.isDeleting = false;
        this.getPrograms();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Project Deleted',
          life: 3000,
        });
      },
    });
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('pdfTable');

    this.fileService.openPdf(DATA, 'Items List');
  }
}
