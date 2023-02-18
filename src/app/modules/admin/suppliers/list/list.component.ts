import { ISupplier } from '@models/supplier.model';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Paginated } from '@feathersjs/feathers';
import { EmployeesService } from '@services/employees.service';
import { FilesService } from '@services/files.service';

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
    private filesService: FilesService
  ) {}

  cols: any[] = [];

  exportColumns: any[] = [];

  ngOnInit() {
    this.suppliersService.suppliers$().pipe(
      map((m: Paginated<any>) => (this.suppliers = m.data)),
      map((m: Array<any>) => m.reverse())
    );

    this.cols = [
      {
        field: 'FirstName',
        header: 'FirstName',
        customExportHeader: 'First Name',
      },
      { field: 'Surname', header: 'Surname' },
      { field: 'IDNo', header: 'IDNo' },
      { field: 'Town', header: 'Town' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
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
}
