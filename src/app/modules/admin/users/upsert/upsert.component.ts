import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/data/services/user.service';
import { MustMatch } from '@utils/must-match.validator';
/*import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  IFilter,
  ACTIONS as FilterACTIONS,
} from 'router-outletapp/data/reducers/user-filter.reducer';
import * as Rx from 'rxjs';*/

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
    private toastr: ToastrService // private alertService: AlertService
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
          this.toastr.success('User added', 'Success');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error: any) => {
          this.toastr.error(error);
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
          this.toastr.success('User updated', 'Success');
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error: any) => {
          this.toastr.error(error);
          this.loading = false;
        },
      });
  }
  /*public name = new FormControl();
  public email = new FormControl();
  constructor(private store: Store<any>) {
    store.select('filter').subscribe((filter: IFilter) => {
      this.name.setValue(filter.name);
      this.email.setValue(filter.email);
    });
    Rx.Observable.merge(this.name.valueChanges, this.email.valueChanges)
      .debounceTime(1000)
      .subscribe(() => this.filter());
  }

  ngOnInit() {}

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
