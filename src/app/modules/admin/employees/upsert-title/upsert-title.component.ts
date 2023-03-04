import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITitle } from '@models/title.model';
import { TitlesService } from '@services/titles.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-upsert-title',
  templateUrl: './upsert-title.component.html',
  styleUrls: ['./upsert-title.component.css'],
})
export class UpsertTitleComponent implements OnInit {
  id: number = 0;
  titleForm: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  title?: ITitle;

  constructor(
    @Inject(DynamicDialogRef) public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MessageService) public messageService: MessageService,
    public router: Router,
    private titleService: TitlesService
  ) {
    this.titleForm = this.fb.group({
      Title: ['', [Validators.required]],
    });
  }

  get f() {
    return this.titleForm.controls;
  }

  saveTitle() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.titleForm.invalid) return;

    return this.titleService
      .create(this.titleForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Title saved',
          });
          this.router.navigateByUrl('/admin/employees/add');
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  ngOnInit(): void {}
}
