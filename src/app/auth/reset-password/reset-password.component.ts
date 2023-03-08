import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { MustMatch } from '@utils/must-match.validator';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AuthService,
    private toastr: MessageService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        Password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.toastr.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    // this.accountService
    //   .resetPassword(this.f['password'].value, this.f['confirmPassword'].value)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       this.toastr.add({
    //         severity: 'success',
    //         detail: 'Password reset successful, you can now login',
    //       });
    //       this.router.navigate(['../login'], { relativeTo: this.route });
    //     },
    //     error: (error) => {
    //       this.toastr.add({ severity: 'error', detail: error });
    //       this.loading = false;
    //     },
    //   });
  }
}
