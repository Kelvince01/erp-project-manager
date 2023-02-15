import { getEmailSetting } from './../../../../../data/email-settings/email-setting.reducer';
import { IEmailSetting } from '@models/email-setting.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailSettingState } from '@email-setting-store/email-setting.state';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.css'],
})
export class EmailSettingsComponent {
  id: number = 0;
  emailSettingsForm: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  emailSetting?: Observable<IEmailSetting>;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    public messageService: MessageService,
    private store: Store<EmailSettingState>
  ) {
    this.emailSettingsForm = this.fb.group({
      Group: ['', [Validators.required]],
      Subject: ['', [Validators.required]],
      Username: ['', []],
      Password: ['', []],
      OutgoingServer: ['', []],
      MaxPerHour: ['', []],
      SenderEmail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.emailSetting = this.store.select(
      getEmailSetting
    ) as Observable<IEmailSetting>;
  }

  save() {
    if (this.emailSettingsForm.invalid)
      // true if any form validation fail
      return;

    if (this.emailSettingsForm.get('id')?.value === 0) {
      // on Create New CompanyInfo
      // this.companyInfoService.addCompanyInfo(this.companyInfoform.value);
    } else {
      // on Update CompanyInfo info
      // this.companyInfoService.updateCompanyInfo(this.companyInfoform.value);
    }

    //Redirecting to companyInfo List page after save or update
    // this.router.navigate(['/companyInfo']);
  }
}
