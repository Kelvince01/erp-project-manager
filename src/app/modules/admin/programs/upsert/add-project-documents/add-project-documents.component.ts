import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '@services/projects.service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-project-documents',
  templateUrl: './add-project-documents.component.html',
  styleUrls: ['./add-project-documents.component.css'],
})
export class AddProjectDocumentsComponent implements OnInit {
  form!: FormGroup;
  id?: string;
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

  private saveProject() {
    // create or update user based on id param
    return this.projectsService.update(this.id!, this.form.value);
  }
}
