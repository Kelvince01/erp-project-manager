import { select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/data/services/user.service';
import { MustMatch } from '@utils/must-match.validator';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  form!: FormGroup;
  id: string = '';
  isAddMode: boolean = false;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: MessageService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group(
      {
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
        password: [
          '',
          [
            Validators.minLength(6),
            this.isAddMode ? Validators.required : Validators.nullValidator,
          ],
        ],
        confirmPassword: [
          '',
          this.isAddMode ? Validators.required : Validators.nullValidator,
        ],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    if (!this.isAddMode) {
      this.userService
        .getById(Number(this.id))
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
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
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.add({
            severity: 'success',
            detail: 'User added',
            summary: 'Success',
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error: any) => {
          this.toastr.add({ severity: 'success', detail: error });
          this.loading = false;
        },
      });
  }

  private updateUser() {
    this.userService
      .update(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.add({
            severity: 'success',
            detail: 'User updated',
            summary: 'Success',
          });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error: any) => {
          this.toastr.add({ severity: 'error', detail: error });
          this.loading = false;
        },
      });
  }
  /*
  filter() {
    this.store.dispatch({
      type: FilterACTIONS.UPDATE_FITLER,
      payload: {
        name: this.name.value,
        email: this.email.value,
      },
    });
  }

  clearFilter() {
    this.store.dispatch({
      type: FilterACTIONS.CLEAR_FITLER,
    });
  }*/
}
