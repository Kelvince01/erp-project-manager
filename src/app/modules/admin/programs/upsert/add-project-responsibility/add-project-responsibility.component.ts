import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '@models/employee.model';
import { EmployeesService } from '@services/employees.service';
import { ProjectsService } from '@services/projects.service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-project-responsibility',
  templateUrl: './add-project-responsibility.component.html',
  styleUrls: ['./add-project-responsibility.component.css'],
})
export class AddProjectResponsibilityComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  loading = false;
  submitting = false;
  submitted = false;
  employees: IEmployee[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private employeeService: EmployeesService,
    private alertService: MessageService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getEmployees();

    this.form = this.formBuilder.group({
      LeadPerson: ['', Validators.required],
      Summary: ['', Validators.required],
    });

    if (this.id) {
      // edit mode
      this.loading = true;
      this.projectsService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveProject()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.add({
            severity: 'success',
            detail: 'Program saved',
          });
          this.router.navigateByUrl('/admin/programs');
        },
        error: (error: any) => {
          this.alertService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  getEmployees() {
    this.employeeService
      .employees$()
      .pipe(first())
      .subscribe((employees) => (this.employees = employees.data));
  }

  private saveProject() {
    // create or update user based on id param
    return this.projectsService.update(this.id!, this.form.value);
  }
}
