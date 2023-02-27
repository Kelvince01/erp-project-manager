import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailsService } from '@services/emails.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  newsletterForm!: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailsService) {}

  ngOnInit() {
    this.newsletterForm = this.fb.group({
      email: [
        '',
        [Validators.compose([Validators.required, Validators.email])],
      ],
    });
  }

  subscribe() {
    if (this.newsletterForm.valid) {
      // console.log(this.newsletterForm.value);
    }
  }
}
