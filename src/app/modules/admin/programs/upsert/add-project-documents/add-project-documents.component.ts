import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-project-documents',
  templateUrl: './add-project-documents.component.html',
  styleUrls: ['./add-project-documents.component.css'],
})
export class AddProjectDocumentsComponent {
  form!: FormGroup;
  id?: string;
  loading = false;
  submitting = false;
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
