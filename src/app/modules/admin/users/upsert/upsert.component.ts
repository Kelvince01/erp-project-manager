import { EmployeesService } from '@services/employees.service';
import { select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/data/services/user.service';
import { MustMatch } from '@utils/must-match.validator';
import { IGroup } from '@models/group.model';
import { IDepartmentSection } from '@models/department-section.model';
import { IEmployee } from '@models/employee.model';
import { IRole } from '@models/role.model';
import { DepartmentsService } from '@services/departments.service';
import { RolesService } from '@services/roles.service';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  form!: FormGroup;
  id: string = '';
  isAddMode: boolean = false;
  loading = false;
  submitted = false;
  employees: IEmployee[] = [];
  roles: IRole[] = [];
  sections: IDepartmentSection[] = [];
  groups: IGroup[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: MessageService,
    private employeeService: EmployeesService,
    private roleService: RolesService,
    private departmentService: DepartmentsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.getEmployees();
    this.getRoles();
    this.getSections();
    this.getGroups();

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group(
      {
        EmployeeID: ['', Validators.required],
        isEmployee: ['', Validators.required],
        FirstName: ['', Validators.required],
        Surname: ['', Validators.required],
        UserName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        RoleID: ['', Validators.required],
        GroupID: ['', Validators.required],
        SectionID: ['', Validators.required],
        Password: [
          '',
          [
            Validators.minLength(6),
            this.isAddMode ? Validators.required : Validators.nullValidator,
          ],
        ],
        confirmPassword: [
          '',
          this.isAddMode ? Validators.required : Validators.nullValidator,
        ],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    if (!this.isAddMode) {
      this.userService
        .getById(Number(this.id))
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  _prevSelected1: any;
  // _prevSelected2: any;

  handleChange1(evt: any) {
    var target = evt.target;
    if (target.checked) {
      this._prevSelected1 = target;
    }
  }

  handleChange2(evt: any) {
    var target = evt.target;
    if (target.checked) {
      this._prevSelected1 = false;
    }
  }

  getEmployees() {
    this.employeeService
      .employees$()
      .pipe(first())
      .subscribe((employees) => (this.employees = employees.data));
  }

  getRoles() {
    this.roleService
      .roles$()
      .pipe(first())
      .subscribe((roles) => (this.roles = roles.data));
  }

  getSections() {
    this.departmentService
      .sections$()
      .pipe(first())
      .subscribe((sections) => (this.sections = sections.data));
  }

  getGroups() {
    this.departmentService
      .groups$()
      .pipe(first())
      .subscribe((groups) => (this.groups = groups.data));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.toastr.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService
      .signup(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.add({
            severity: 'success',
            detail: 'User added',
            summary: 'Success',
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error: any) => {
          this.toastr.add({ severity: 'success', detail: error });
          this.loading = false;
        },
      });
  }

  private updateUser() {
    this.userService
      .update(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.add({
            severity: 'success',
            detail: 'User updated',
            summary: 'Success',
          });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error: any) => {
          this.toastr.add({ severity: 'error', detail: error });
          this.loading = false;
        },
      });
  }
  /*
  filter() {
    this.store.dispatch({
      type: FilterACTIONS.UPDATE_FITLER,
      payload: {
        name: this.name.value,
        email: this.email.value,
      },
    });
  }

  clearFilter() {
    this.store.dispatch({
      type: FilterACTIONS.CLEAR_FITLER,
    });
  }*/
}
