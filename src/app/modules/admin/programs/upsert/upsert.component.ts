import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IItemLocation } from '@models/item-location.model';
import { ItemsService } from '@services/items.service';
import { ProjectsService } from '@services/projects.service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-upsert-project',
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
  itemLocations: IItemLocation[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private alertService: MessageService,
    private itemService: ItemsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getItemLocations();

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

    this.title = 'Add Project';
    if (this.id) {
      // edit mode
      this.title = 'Edit Project';
      this.loading = true;
      this.projectsService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          console.log(x);
          this.form.patchValue(x);

          this.form.controls['StartDate'].setValue(
            // formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
            formatDate(x.StartDate, 'yyyy-MM-dd', 'en-US')
          );
          this.form.controls['EndDate'].setValue(
            formatDate(x.EndDate, 'yyyy-MM-dd', 'en-US')
          );
          this.form.controls['DateOfAward'].setValue(
            formatDate(x.DateOfAward, 'yyyy-MM-dd', 'en-US')
          );
          this.loading = false;
        });
    }
  }

  getItemLocations() {
    return this.itemService
      .itemItemLocations$()
      .pipe(first())
      .subscribe((res) => {
        this.itemLocations = res.data;
      });
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
            detail: 'Project saved',
          });
          this.router.navigateByUrl('/admin/projects');
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
