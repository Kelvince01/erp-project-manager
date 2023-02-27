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

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent implements OnInit {
  expenseForm: any = FormGroup;
  submitted = false;
  expense: any;
  suppliers: ISupplier[] = [];
  classOfTrans: IClassOfTransaction[] = [];
  accounts: IAccount[] = [];
  projects: IProject[] = [];
  items: IItem[] = [];

  submittedItem = false;
  itemDialog: boolean = false;
  item: any;
  itemData: any[] = [];

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

  get f() {
    return this.expenseForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.expenseForm.invalid) {
      return;
    }

    console.log(this.expenseForm.value);
  }

  ngOnInit() {
    this.getSuppliers();
    this.getClassOfTrans();
    this.getAccounts();
    this.getProjects();

    this.expenseForm = this.formBuilder.group({
      AccountID: ['', [Validators.required]],
      ClassID: ['', [Validators.required]],
      SupplierID: ['', [Validators.required]],
      ProjectID: ['', [Validators.required]],
      AmountTotal: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      RefNo: ['', [Validators.required]],
      Date: ['', [Validators.required]],
    });
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

  getClassOfTrans() {
    let query = {
      ClassOfTrans: 'Service',
    };

    return this.classOfTransService
      .classOfTransaction$(query)
      .pipe(first())
      .subscribe((res) => {
        this.classOfTrans = res.data;
      });
  }

  getAccounts() {
    let query = {
      AccountTypeID: 8,
    };

    return this.accountService
      .accounts$()
      .pipe(first())
      .subscribe((res) => {
        this.accounts = res.data;
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

  generatePDF() {
    let docDefinition = {
      header: 'C#Corner PDF Header',
      content:
        'Sample PDF generated with Angular and PDFMake for C#Corner Blog',
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
