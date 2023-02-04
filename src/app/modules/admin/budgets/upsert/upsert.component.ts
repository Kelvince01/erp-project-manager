import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upsert-budget',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    number: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password1: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  get firstName(): any {
    return this.registerForm.get('firstName');
  }
  get lastName(): any {
    return this.registerForm.get('lastName');
  }
  get email(): any {
    return this.registerForm.get('email');
  }
  get number(): any {
    return this.registerForm.get('number');
  }
  get password(): any {
    return this.registerForm.get('password');
  }
  get password1(): any {
    return this.registerForm.get('password1');
  }
  registerFormSubmit(): void {
    const formData = this.registerForm.value;
    delete formData.password1;
    console.log(formData);
    // Api Request Here
  }
}
