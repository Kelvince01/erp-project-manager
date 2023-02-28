import { IAccount } from '@models/account.model';
import { EmployeesService } from '@services/employees.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassOfTransactionService } from '@services/class-of-transaction.service';
import { BankingService } from '@services/banking.service';
import { JournalsService } from '@services/journals.service';
import { first } from 'rxjs';
import { ISupplier } from '@models/supplier.model';
import { IClassOfTransaction } from '@models/class-of-transaction.model';
import { IProject } from '@models/project.model';
import { ProjectsService } from '@services/projects.service';
import { IItem } from '@models/item.model';
import { ItemsService } from '@services/items.service';
import { ConfirmationService, MessageService } from 'primeng/api';

class Product {
  ItemName?: string;
  Rate?: number;
  Quantity?: number;
  AmountTotal?: number;
  Tax?: number;
}

class Invoice {
  AccountID?: number;
  ClassID?: number;
  SupplierID?: number;
  ProjectID?: number;
  AmountTotal?: number;
  Address?: string;
  RefNo?: string;
  Date?: Date;

  products: Product[] = [];

  constructor() {
    // Initially one empty product row we will show
    this.products.push(new Product());
  }
}

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { imageLogo } from '../image-logo';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent implements OnInit {
  submitted = false;
  expense: any;
  suppliers: ISupplier[] = [];
  classOfTrans: IClassOfTransaction[] = [];
  accounts: IAccount[] = [];
  projects: IProject[] = [];
  items: IItem[] = [];
  employeeId: any;

  submittedItem = false;
  itemDialog: boolean = false;
  item: any;
  itemData: any[] = [];

  invoice = new Invoice();

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: EmployeesService,
    private classOfTransService: ClassOfTransactionService,
    private accountService: BankingService,
    private journalService: JournalsService,
    private projectService: ProjectsService,
    private itemService: ItemsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  onSubmit() {
    this.submitted = true;
    // if (this.expenseForm.invalid) {
    //   return;
    // }

    // console.log(this.expenseForm.value);
  }

  ngOnInit() {
    this.getSuppliers();
    this.getClassOfTrans();
    this.getAccounts();
    this.getProjects();

    this.invoice.RefNo = this.createId();

    console.log(this.invoice);
  }

  openNewItem() {
    this.item = {};
    this.submitted = false;
    this.itemDialog = true;
  }

  getSuppliers() {
    return this.supplierService
      .suppliers$()
      .pipe(first())
      .subscribe((res) => {
        this.suppliers = res.data;
      });
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.employeeId = event.target.value;
    this.supplierService.getById(this.employeeId).subscribe((res) => {
      let address = `
        ${res.POBox}, ${res.PostalCode}, ${res.Estate}, ${res.Town}
      `;

      this.invoice.Address = address;
    });
  }

  getClassOfTrans() {
    let query = {
      ClassOfTrans: 'Service',
    };

    return this.classOfTransService
      .classOfTransaction$(query)
      .pipe(first())
      .subscribe((res) => {
        this.classOfTrans = res.data;
        this.invoice.ClassID = this.classOfTrans[0].ClassID;
      });
  }

  getAccounts() {
    let query = {
      AccountTypeID: 8,
    };

    return this.accountService
      .accounts$(query)
      .pipe(first())
      .subscribe((res) => {
        this.accounts = res.data;
        this.invoice.AccountID = this.accounts[0].AccountID;
      });
  }

  getProjects() {
    return this.projectService
      .projects$()
      .pipe(first())
      .subscribe((res) => {
        this.projects = res.data;
      });
  }

  hideDialog() {
    this.itemDialog = false;
    this.submittedItem = false;
  }

  saveProduct() {
    this.submittedItem = true;

    this.item.id = this.createId();
    this.itemData.push(this.item);
    // console.log(this.item);
    // console.log(this.itemData);

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Created',
      life: 3000,
    });

    this.itemDialog = false;
    this.item = {};
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

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
              ['Item', 'Rate', 'Quantity', 'Amount'],
              ...this.invoice.products.map((p) => [
                p.ItemName,
                p.Rate,
                p.Quantity,
                (p.Rate! * p.Quantity!).toFixed(2),
              ]),
              [
                { text: 'Total Amount', colSpan: 3 },
                {},
                {},
                this.invoice.products
                  .reduce((sum, p) => sum + p.Quantity! * p.Rate!, 0)
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
