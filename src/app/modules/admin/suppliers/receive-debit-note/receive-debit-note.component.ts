import { Component } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { imageLogo } from '../image-logo';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product {
  name?: string;
  price?: number;
  qty?: number;
}

class Invoice {
  customerName?: string;
  address?: string;
  contactNo?: number;
  email?: string;

  products: Product[] = [];
  additionalDetails?: string;

  constructor() {
    // Initially one empty product row we will show
    this.products.push(new Product());
  }
}

@Component({
  selector: 'app-receive-debit-note',
  templateUrl: './receive-debit-note.component.html',
  styleUrls: ['./receive-debit-note.component.css'],
})
export class ReceiveDebitNoteComponent {
  invoice = new Invoice();
  resultDialog: boolean = false;

  generatePDF(action = 'open') {
    let docDefinition: any = {
      content: [
        {
          image: imageLogo,
          margin: [0, 20, 0, 0],
          alignment: 'center',
          width: 100,
        },
        {
          columns: [
            [
              {
                text: 'Church Building',
                bold: true,
              },
              { text: 'Birongo Road' },
              { text: 'P.O Box 19324, 00202 Nairobi' },
              { text: 'Tel +254 724 57 99 26' },
            ],
            [
              {
                text: `PIN No : ${(Math.random() * 1000).toFixed(0)}`,
                alignment: 'right',
              },
              {
                text: `VAT No : ${(Math.random() * 2000).toFixed(0)}`,
                alignment: 'right',
              },
              {
                text: `Website : onstergroup.co.ke`,
                alignment: 'right',
              },
              {
                text: `Email : onstergroup@gmail.com`,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: 'Supplier Payments',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.invoice.products.map((p) => [
                p.name,
                p.price,
                p.qty,
                (p.price! * p.qty!).toFixed(2),
              ]),
              [
                { text: 'Total Amount', colSpan: 3 },
                {},
                {},
                this.invoice.products
                  .reduce((sum, p) => sum + p.qty! * p.price!, 0)
                  .toFixed(2),
              ],
            ],
          },
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
      },
    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  addProduct() {
    this.invoice.products.push(new Product());
  }
}
