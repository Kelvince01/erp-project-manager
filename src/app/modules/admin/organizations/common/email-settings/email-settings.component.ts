import {
  invokeSaveNewEmailSettingAPI,
  saveNewEmailSettingAPISuccess,
  updateEmailSettingAPISuccess,
  invokeEmailSettingsAPI,
  invokeUpdateEmailSettingAPI,
} from './../../../../../data/email-settings/email-setting.action';
import {
  selectEmailSettings,
  selectEmailSettingById,
} from './../../../../../data/email-settings/email-setting.selector';
import { IEmailSetting } from '@models/email-setting.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, switchMap, EMPTY } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Appstate } from '@stores/appstate';
import { selectAppState } from 'src/app/data/selectors/app.selector';
import { setAPIStatus } from '@stores/app.action';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.css'],
})
export class EmailSettingsComponent implements OnInit {
  id: number = 0;
  emailSettingsForm: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  // emailSetting?: Observable<IEmailSetting>;
  emailSetting?: IEmailSetting;

  constructor(
    @Inject(DynamicDialogRef) public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MessageService) public messageService: MessageService,
    @Inject(Store) private store: Store,
    private appStore: Store<Appstate>,
    public router: Router,
    private route: ActivatedRoute
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
      // tags: this.fb.array([]),
    });
  }

  emailSettings$ = this.store.pipe(select(selectEmailSettings));

  ngOnInit(): void {
    // this.emailSetting = this.store.select(selectEmailSettings);
    this.store.dispatch(invokeEmailSettingsAPI());
    // ) as Observable<IEmailSetting>;
    this.emailSettings$.subscribe((res) => {
      if (res) {
        this.emailSetting = res[0];
      } else {
        this.emailSetting = {};
      }

      if (this.emailSetting) {
        this.emailSettingsForm.patchValue({
          ID: this.emailSetting.ID,
          Group: this.emailSetting.Group,
          Subject: this.emailSetting.Subject,
          Username: this.emailSetting.Username,
          Password: this.emailSetting.Password,
          OutgoingServer: this.emailSetting.OutgoingServer,
          MaxPerHour: this.emailSetting.MaxPerHour,
          SenderEmail: this.emailSetting.SenderEmail,
        });
      } else {
        this.id = 0;
      }
    });

    // let fetchData$ = this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     var id = Number(params.get('id'));
    //     this.id = id;
    //     return this.store.pipe(select(selectEmailSettingById(id)));
    //   })
    // );
    // fetchData$.subscribe((data) => {
    //   if (data) {
    //     // this.emailSettingsForm. = { ...data };
    //     this.emailSettingsForm.patchValue({
    //       ID: data.ID,
    //       Group: data.Group,
    //       Subject: data.Subject,
    //       Username: data.Username,
    //       Password: data.Password,
    //       OutgoingServer: data.OutgoingServer,
    //       MaxPerHour: data.MaxPerHour,
    //       SenderEmail: data.SenderEmail,
    //     });
    //     // this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    //   } else {
    //     this.id = 0;
    //   }
    // });
  }

  saveEmailSetting() {
    if (this.emailSettingsForm.invalid)
      // true if any form validation fail
      return;

    this.store.dispatch(
      invokeSaveNewEmailSettingAPI({
        newEmailSetting: this.emailSettingsForm.value,
      })
    );
    let apiStatus$ = this.store.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }

  updateEmailSetting() {
    this.store.dispatch(
      invokeUpdateEmailSettingAPI({
        updateEmailSetting: { ...this.emailSettingsForm.value },
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }

  save() {
    if (this.id === 0) {
      this.saveEmailSetting();
    } else {
      this.updateEmailSetting();
    }

    //Redirecting to companyInfo List page after save or update
    this.router.navigate(['/admin/organizations']);
  }
}
