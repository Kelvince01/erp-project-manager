import { UpsertTitleComponent } from './../upsert-title/upsert-title.component';
import { IBank } from '@models/bank.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { selectDepartments } from '@departments-store/department.selector';
import { invokeDepartmentsAPI } from '@departments-store/departments.action';
import { IEmployee } from '@models/employee.model';
import { ITitle } from '@models/title.model';
import { Store, select } from '@ngrx/store';
import { EmployeesService } from '@services/employees.service';
import { Appstate } from '@stores/appstate';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { BankingService } from '@services/banking.service';
import { TitlesService } from '@services/titles.service';
import { CountriesService } from '@services/countries.service';
import { ICountry } from '@models/country.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  employee: IEmployee = {};
  submitted: boolean = false;
  title!: string;
  form!: FormGroup;
  id?: string;
  loading = false;
  submitting = false;
  departments$ = this.store.pipe(select(selectDepartments))! as any;
  titles!: ITitle[];
  countries!: ICountry[];
  banks!: IBank[];
  selectedTitle!: ITitle;

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeesService,
    private titlesService: TitlesService,
    private banksService: BankingService,
    private countriesService: CountriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.store.dispatch(invokeDepartmentsAPI());
    this.title = 'Add Employee';
    this.getTitles();
    this.getCountries();
    this.getBanks();

    this.form = this.fb.group({
      FirstName: ['', Validators.required],
      TitleID: ['', Validators.required],
      Surname: ['', Validators.required],
      MiddleName: ['', Validators.required],
      IDNo: ['', Validators.required],
      PINNo: ['', Validators.required],
      CountryID: ['', Validators.required],
      isForeign: [],
      Male: [],
      Bank: ['', Validators.required],
      BankAcNo: ['', Validators.required],
      BranchID: ['', Validators.required],
      BankCode: ['', Validators.required],
      DateEmployed: [],
      DateEnding: [],
      SubCompanyID: [],
      EndDateChecked: [],
      DeptID: [],
      Retired: [],
      PayGradeID: ['', Validators.required],
      DesignationID: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      VacancyAppStatusID: ['', Validators.required],
      NextofKin: ['', Validators.required],
      NextPhone: ['', Validators.required],
      NextEmail: ['', Validators.required],
      Residence: ['', Validators.required],
    });

    if (this.id) {
      // edit mode
      this.title = 'Edit Employee';
      this.loading = true;
      this.employeeService
        .getById(Number(this.id))
        .pipe(first())
        .subscribe((x: any) => {
          this.form.patchValue(x);

          this.form.controls['DateEmployed'].setValue(
            formatDate(x.DateEmployed, 'yyyy-MM-dd', 'en-US')
          );
          this.form.controls['DateOfBirth'].setValue(
            formatDate(x.DateOfBirth, 'yyyy-MM-dd', 'en-US')
          );

          this.loading = false;
        });
    }
  }

  public showDateEnding: boolean = false;

  public onDateEndingChanged(value: boolean) {
    this.showDateEnding = value;
  }

  ref: DynamicDialogRef = new DynamicDialogRef();

  addTitle() {
    this.ref = this.dialogService.open(UpsertTitleComponent, {
      header: 'Add Title',
      width: '60%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((emailSetting: ITitle) => {
      this.getTitles();
      if (emailSetting) {
        this.form.patchValue({ TitleID: emailSetting.TitleID });
        this.messageService.add({
          severity: 'info',
          summary: 'Title Selected',
          detail: emailSetting.Title,
        });
      }
    });
  }

  getTitles() {
    return this.titlesService
      .titles$()
      .pipe(first())
      .subscribe((res) => {
        this.titles = res.data;
      });
  }

  getCountries() {
    return this.countriesService
      .countries$()
      .pipe(first())
      .subscribe((res) => {
        this.countries = res.data;
      });
  }

  getBanks() {
    return this.banksService
      .banks$()
      .pipe(first())
      .subscribe((res) => {
        this.banks = res.data;
      });
  }

  get f() {
    return this.form.controls;
  }

  save() {
    this.submitted = true;
    // reset alerts on submit
    this.messageService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveEmployee()
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/employees');
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  private saveEmployee() {
    console.log(this.form.value);

    // create or update user based on id param
    return this.id
      ? this.employeeService.update(this.form.value)
      : this.employeeService.create(this.form.value);
  }

  Cancel() {}

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
