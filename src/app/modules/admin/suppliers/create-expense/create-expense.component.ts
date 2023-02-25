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

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent implements OnInit {
  registerForm: any = FormGroup;
  submitted = false;
  expense: any;
  suppliers: ISupplier[] = [];
  classOfTrans: IClassOfTransaction[] = [];
  accounts: IAccount[] = [];
  projects: IProject[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: EmployeesService,
    private classOfTransService: ClassOfTransactionService,
    private accountService: BankingService,
    private journalService: JournalsService,
    private projectService: ProjectsService
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

  ngOnInit() {
    this.getSuppliers();
    this.getClassOfTrans();
    this.getAccounts();
    this.getProjects();

    this.registerForm = this.formBuilder.group({
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
}
