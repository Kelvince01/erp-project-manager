import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-receive-bill',
  templateUrl: './receive-bill.component.html',
  styleUrls: ['./receive-bill.component.css'],
})
export class ReceiveBillComponent implements OnInit {
  registerForm: any = FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}
  //Add user form actions
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      alert('Great!!');
    }
  }
  ngOnInit() {
    //Add form validations
    this.registerForm = this.formBuilder.group({
      ffrom: ['', [Validators.required]],
      fto: ['', [Validators.required]],
      dparting: ['', [Validators.required]],
      returning: ['', [Validators.required]],
      adults: ['', [Validators.required]],
      children: ['', [Validators.required]],
      travel: ['', [Validators.required]],
      roundtripopt: ['', [Validators.required]],
    });
  }
}
