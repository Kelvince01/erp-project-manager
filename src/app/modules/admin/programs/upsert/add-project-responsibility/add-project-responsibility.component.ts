import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-project-responsibility',
  templateUrl: './add-project-responsibility.component.html',
  styleUrls: ['./add-project-responsibility.component.css'],
})
export class AddProjectResponsibilityComponent {
  form!: FormGroup;
  id?: string;
  loading = false;
  submitting = false;
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
