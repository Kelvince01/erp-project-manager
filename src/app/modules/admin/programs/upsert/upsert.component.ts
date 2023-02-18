import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '@services/projects.service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private alertService: MessageService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      ProjectName: ['', Validators.required],
      Description: ['', Validators.required],
      ProjectCode: ['', Validators.required],
      Code: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      DateOfAward: ['', Validators.required],
      Country: ['', Validators.required],
    });

    this.title = 'Add Program';
    if (this.id) {
      // edit mode
      this.title = 'Edit Program';
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

  private saveProject() {
    // create or update user based on id param
    return this.id
      ? this.projectsService.update(this.id!, this.form.value)
      : this.projectsService.create(this.form.value);
  }
}
