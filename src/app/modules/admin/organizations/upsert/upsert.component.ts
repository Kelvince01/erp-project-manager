import { IEmailSetting } from './../../../../data/models/email-setting.model';
import { EmailSettingsComponent } from './../common/email-settings/email-settings.component';
import { UploadService } from './../../../../data/services/upload.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfoService } from '@services/company-info.service';
import { ImageSnippet } from '@shared/models/image-snippet.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { first } from 'rxjs';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  id: number = 0;
  companyInfoForm!: FormGroup;
  selectedFile!: ImageSnippet;
  uploadedFiles: any[] = [];
  // @ViewChild('fileUpload') fileUpload?: FileUpload;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private companyInfoService: CompanyInfoService,
    private uploadService: UploadService,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ref: DynamicDialogRef = new DynamicDialogRef();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.companyInfoForm = this.fb.group({
      ProjectID: ['', [Validators.required]],
      FYEnd: ['', [Validators.required]],
      CompanyLogo: new FormControl(),
      CompanyName: ['', []],
      LegalName: ['', []],
      CompanyInitials: ['', []],
      NSSFNo: ['', [Validators.required]],
      NHIFNo: ['', [Validators.required]],
      PINNo: ['', [Validators.required]],
      VATNo: [null, [Validators.required]],
      GenerateNo: [true],
      isOrgRegistered: [true],
      DateID: ['', [Validators.required]],
      MonthID: ['', [Validators.required]],
      Building: ['', [Validators.required]],
      Road: ['', [Validators.required]],
      POBox: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
      Town: ['', [Validators.required]],
      EmailAddress: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      Website: ['', [Validators.required]],
      Tel1: ['', [Validators.required]],
      Tel2: ['', [Validators.required]],
      Mobile1: ['', [Validators.required]],
    });

    this.title = 'Add Program';
    if (this.id) {
      // edit mode
      this.title = 'Edit Program';
      this.loading = true;
      this.companyInfoService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.companyInfoForm.patchValue(x);
          this.loading = false;
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.companyInfoForm.controls;
  }

  emailSettings() {
    this.ref = this.dialogService.open(EmailSettingsComponent, {
      header: 'Email Settings Detail',
      width: '60%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((emailSetting: IEmailSetting) => {
      if (emailSetting) {
        this.messageService.add({
          severity: 'info',
          summary: 'Product Selected',
          detail: emailSetting.Username,
        });
      }
    });
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);

      this.companyInfoForm.patchValue({ CompanyLogo: file });
      this.companyInfoForm.get('CompanyLogo')?.updateValueAndValidity();

      this.uploadService.upload(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        }
      );
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.companyInfoForm.patchValue({
        CompanyLogo: this.selectedFile.file.name,
      });
      this.companyInfoForm.get('CompanyLogo')?.updateValueAndValidity();
      this.uploadService.upload(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        }
      );
    });

    reader.readAsDataURL(file);
  }

  save() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    // stop here if form is invalid
    if (this.companyInfoForm.invalid) {
      return;
    }

    this.submitting = true;
    this.saveProject()
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Company saved',
          });
          this.router.navigateByUrl('/admin/organizations');
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', detail: error });
          this.submitting = false;
        },
      });
  }

  private saveProject() {
    // create or update user based on id param
    return this.id
      ? this.companyInfoService.update(this.companyInfoForm.value)
      : this.companyInfoService.create(this.companyInfoForm.value);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
