import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { selectDepartments } from '@departments-store/department.selector';
import { invokeDepartmentsAPI } from '@departments-store/departments.action';
import { IEmployee } from '@models/employee.model';
import { Store, select } from '@ngrx/store';
import { EmployeesService } from '@services/employees.service';
import { Appstate } from '@stores/appstate';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';

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

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(invokeDepartmentsAPI());
    this.title = 'Add Employee';

    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      FirstName: ['', Validators.required],
      Surname: ['', Validators.required],
      MiddleName: ['', Validators.required],
    });

    if (this.id) {
      // edit mode
      this.title = 'Edit User';
      this.loading = true;
      this.employeeService
        .getById(Number(this.id))
        .then(first())
        .then((x: any) => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
  }

  get f() {
    return this.form.controls;
  }

  saveEmployee() {
    this.submitted = true;

    if (this.employee.FirstName!.trim()) {
      if (this.employee.EmployeeID) {
        //
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employee Updated',
          life: 3000,
        });
      } else {
        // this.employee.id = this.createId();
        // this.employee.image = 'employee-placeholder.svg';
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employee Created',
          life: 3000,
        });
      }
    }
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
