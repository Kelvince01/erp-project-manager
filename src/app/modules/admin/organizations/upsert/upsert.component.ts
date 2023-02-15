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

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  id: number = 0;
  companyInfoForm: FormGroup;
  selectedFile!: ImageSnippet;
  uploadedFiles: any[] = [];
  @ViewChild('fileUpload') fileUpload?: FileUpload;
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
  ) {
    //**************Create Reactive Form with validation********************* */
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
  }

  ref: DynamicDialogRef = new DynamicDialogRef();

  ngOnInit(): void {
    //**************Get CompanyInfo ID On Edit********************* */
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.companyInfoForm.get('Id')?.setValue(params['id']);
        // const data = this.companyInfoService.getCompanyInfosByID(this.id);
        // if (data) {
        //   this.companyInfoform.setValue(data);
        // }
      }
    });
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
    if (this.companyInfoForm.invalid)
      // true if any form validation fail
      return;

    if (this.companyInfoForm.get('id')?.value === 0) {
      // on Create New CompanyInfo
      // this.companyInfoService.addCompanyInfo(this.companyInfoform.value);
    } else {
      // on Update CompanyInfo info
      // this.companyInfoService.updateCompanyInfo(this.companyInfoform.value);
    }

    //Redirecting to companyInfo List page after save or update
    // this.router.navigate(['/companyInfo']);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
