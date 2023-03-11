import { AddTypeComponent } from './../items/add-type/add-type.component';
import { AddStatusComponent } from './../items/add-status/add-status.component';
import { UpsertComponent } from './../items/upsert/upsert.component';
import { MessageService } from 'primeng/api';
import { AddClassOfTransComponent } from './../add-class-of-trans/add-class-of-trans.component';
import { ISupplier } from '@models/supplier.model';
import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Paginated } from '@feathersjs/feathers';
import { EmployeesService } from '@services/employees.service';
import { FilesService } from '@services/files.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IClassOfTransaction } from '@models/class-of-transaction.model';
import { IItem } from '@models/item.model';
import { IITemStatus } from '@models/item-status.model';
import { Invoice } from '../create-expense/create-expense.component';

@Component({
  selector: 'app-list-suppliers',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  suppliers: ISupplier[] = [];
  selectedSuppliers: ISupplier[] = [];
  // @Input() index: number = 0;
  // @Input() invoice = new Invoice();

  constructor(
    private suppliersService: EmployeesService,
    private filesService: FilesService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  cols: any[] = [];

  exportColumns: any[] = [];

  ngOnInit() {
    this.getSuppliers();

    this.cols = [
      {
        field: 'CompanyName',
        header: 'CompanyName',
        customExportHeader: 'Company Name',
        dataKey: 'CompanyName',
      },
      { field: 'Residence', header: 'Residence', dataKey: 'Residence' },
      { field: 'Mobile', header: 'Mobile', dataKey: 'Mobile' },
      { field: 'Town', header: 'Town', dataKey: 'Town' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getSuppliers() {
    this.suppliersService
      .suppliers$()
      .pipe(first())
      .subscribe(
        (res: Paginated<any>) => {
          this.suppliers = res.data;
        },
        (m: Array<any>) => m.reverse()
      );
  }

  exportPdf() {
    this.filesService.exportPdf(this.cols, this.suppliers, 'Suppliers List');
  }

  exportExcel() {
    this.filesService.exportExcel(this.cols, 'Suppliers List');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.filesService.saveAsExcelFile(buffer, fileName);
  }

  ref: DynamicDialogRef = new DynamicDialogRef();

  addClassOfTrans() {
    this.ref = this.dialogService.open(AddClassOfTransComponent, {
      header: 'Add Class of Transaction',
      width: '60%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((currency: IClassOfTransaction) => {
      if (currency) {
        this.messageService.add({
          severity: 'info',
          summary: 'Class of Transaction Selected',
          detail: currency.ClassOfTrans,
        });
      }
    });
  }

  addItem() {
    this.ref = this.dialogService.open(UpsertComponent, {
      header: 'Add Item',
      width: '80%',
      contentStyle: { 'max-height': '800px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((currency: IItem) => {
      if (currency) {
        this.messageService.add({
          severity: 'info',
          summary: 'Item Selected',
          detail: currency.ItemName,
        });
      }
    });
  }

  addItemType() {
    this.ref = this.dialogService.open(AddTypeComponent, {
      header: 'Add Item Type',
      width: '60%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((currency: IItem) => {
      if (currency) {
        this.messageService.add({
          severity: 'info',
          summary: 'Item Selected',
          detail: currency.ItemName,
        });
      }
    });
  }

  addItemStatus() {
    this.ref = this.dialogService.open(AddStatusComponent, {
      header: 'Add Item Status',
      width: '60%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((currency: IITemStatus) => {
      if (currency) {
        this.messageService.add({
          severity: 'info',
          summary: 'Item Status Selected',
          detail: currency.ItemStatus,
        });
      }
    });
  }
}
