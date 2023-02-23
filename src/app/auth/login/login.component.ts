import { LocalService } from './../../shared/services/local.service';
import { IRole } from '@models/role.model';
import { RolesService } from './../../data/services/roles.service';
import { LocalStorageService } from './../../shared/services/local-storage.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AuthService,
    private alertService: MessageService,
    // private store: Store,
    private localStorage: LocalStorageService,
    private rolesService: RolesService
  ) {
    // this.store.select(selectToken).subscribe((token) => (this.token = token));
    // this.store.select(selectError).subscribe((error) => (this.error = error));
    // this.store
    // .select(selectIsLoading)
    // .subscribe((isLoading) => (this.loading = isLoading));
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });

    if (this.localStorage.getItem('STATE')) {
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
        this.rolesService.getById(res.user.RoleID).subscribe((resp) => {
          this.localStorage.addItem('ROLE', resp.Role);
          this.role = resp.Role;
          this.localStorage.addItem('STATE', 'true');

          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

          if (resp.Role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigateByUrl(returnUrl);
          }
        });
      })
      .catch((err) => {
        this.alertService.add({ severity: 'error', detail: err });
        this.loading = false;
      });
  }
}
