import { first } from 'rxjs';
import { IRole } from '@models/role.model';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from '@auth-store/auth.actions';
import {
  selectToken,
  selectError,
  selectIsLoading,
} from '@auth-store/auth.selectors';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';
import { BnNgIdleService } from 'bn-ng-idle';
import { IUser } from '@models/user.model';
import { LocalService } from '@shared/services/local.service';
import { RolesService } from '@services/roles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  token = '';
  error = '';
  role = '';
  user?: IUser | null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AuthService,
    private alertService: MessageService,
    // private store: Store,
    private localStorage: LocalStorageService,
    private localService: LocalService,
    private rolesService: RolesService,
    private bnIdle: BnNgIdleService
  ) {
    // this.store.select(selectToken).subscribe((token) => (this.token = token));
    // this.store.select(selectError).subscribe((error) => (this.error = error));
    // this.store
    // .select(selectIsLoading)
    // .subscribe((isLoading) => (this.loading = isLoading));
    this.user = this.accountService.userValue as any;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
    // console.log(this.accountService.isAuthenticated());
    // console.log(this.accountService.userValue as any);
    // if (this.localStorage.getItem('STATE')) {
    // console.log(this.user);

    if (this.accountService.userValue != null) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
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

    this.loading = true;
    // this.store.dispatch(
    //   login({
    //     Email: this.f['Email'].value,
    //     Password: this.f['Password'].value,
    //   })
    // );
    this.accountService
      .logIn({
        strategy: 'local',
        Email: this.f['Email'].value,
        Password: this.f['Password'].value,
      }) // navigate to base URL on success
      .then((res) => {
        // this.bnIdle.startWatching(300).subscribe((res) => {
        //   if(res) {
        //       console.log("session expired");
        //   }
        // })
        this.rolesService.getById(res.user.RoleID).subscribe((resp) => {
          this.localStorage.addItem('ROLE', resp.Role);
          this.role = resp.Role;

          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

          if (resp.Role === 'Admin') {
            this.router.navigate(['/admin']);
          } else if (resp.Role === 'User') {
            this.router.navigate(['/user']);
          } else {
            this.router.navigateByUrl(returnUrl);
          }
        });
      }),
      (error: any) => {
        this.alertService.add({ severity: 'error', detail: error });
        this.loading = false;
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      };
  }
}
