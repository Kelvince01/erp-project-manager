import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UserService,
    private toastr: MessageService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      FirstName: ['', Validators.required],
      Surname: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
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
    this.usersService
      .signup(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful',
          });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error: any) => {
          this.toastr.add({ severity: 'error', summary: error });
          this.loading = false;
        },
      });
  }
}
