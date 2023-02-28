import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  pdfMake: any;
  jsPdf: any;

  constructor() {}

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async loadJsPdf() {
    if (!this.jsPdf) {
      const jsPdfModule = await import('jspdf');
      this.jsPdf = jsPdfModule.default;
    }
  }

  async generatePdf() {
    await this.loadPdfMaker();

    const def = {
      content: 'A sample PDF document generated using Angular and PDFMake',
    };
    this.pdfMake.createPdf(def).open();
  }

  async exportPdf(exportColumns: any, items: any, filename: string) {
    /*import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, items);
        doc.save(`${filename}.pdf`);
      });
    });*/
    await this.loadJsPdf();

    const doc = new this.jsPdf('p', 'pt');
    autoTable(doc, {
      columns: exportColumns,
      body: items,
      didDrawPage: (dataArg) => {
        doc.text('Suppliers List', dataArg.settings.margin.left, 10);
      },
    });
    doc.save(`${filename}.pdf`);
  }

  exportExcel(items: any, filename: string) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(items);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, `${filename}`);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
