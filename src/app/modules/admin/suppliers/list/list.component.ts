import { MessageService } from 'primeng/api';
import { AddClassOfTransComponent } from './../add-class-of-trans/add-class-of-trans.component';
import { ISupplier } from '@models/supplier.model';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Paginated } from '@feathersjs/feathers';
import { EmployeesService } from '@services/employees.service';
import { FilesService } from '@services/files.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IClassOfTransaction } from '@models/class-of-transaction.model';

@Component({
  selector: 'app-list-suppliers',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  suppliers: ISupplier[] = [];
  selectedSuppliers: ISupplier[] = [];

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
        field: 'FirstName',
        header: 'FirstName',
        customExportHeader: 'First Name',
        dataKey: 'FirstName',
      },
      { field: 'Surname', header: 'Surname', dataKey: 'Surname' },
      { field: 'IDNo', header: 'IDNo', dataKey: 'IDNo' },
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
}
