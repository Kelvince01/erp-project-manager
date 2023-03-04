import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmailsService } from '@services/emails.service';

export interface Contact {
  Email: string;
  FullName: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  FormData!: FormGroup;
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage?: string; // the response message to show to the user

  constructor(private fb: FormBuilder, private emailService: EmailsService) {}

  ngOnInit() {
    this.FormData = this.fb.group({
      FullName: new FormControl('', [Validators.required]),
      Email: [
        '',
        [Validators.compose([Validators.required, Validators.email])],
      ],
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(FormData: any) {
    // this.form.disable(); // disable the form if it's valid to disable multiple submissions
    this.isLoading = true; // sending the post request async so it's in progress
    this.submitted = false; // hide the response message on multiple submits

    this.emailService
      .create({
        toAddress: 'info@onstergroup.co.ke',
        fromAddress: FormData.Email,
        emailSubject: FormData.subject,
        emailBody: FormData.message,
        CompanyID: 1,
      })
      .subscribe((res) => {
        FormData = null;
      });

    this.emailService.PostMessage(FormData).subscribe(
      (response: any) => {
        if (response['result'] == 'success') {
          this.responseMessage =
            "Thanks for the message! I'll get back to you soon!";
        } else {
          this.responseMessage =
            'Oops! Something went wrong... Reload the page and try again.';
        }
        // this.form.enable(); // re enable the form after a success
        this.submitted = true; // show the response message
        this.isLoading = false; // re enable the submit button
        console.log(response);

        location.href = 'https://mailthis.to/confirm';
      },
      (error: { responseText: any }) => {
        console.warn(error.responseText);
        console.log({ error });
        this.responseMessage =
          'Oops! An error occurred... Reload the page and try again.';
        // this.form.enable(); // re enable the form after a success
        this.submitted = true; // show the response message
        this.isLoading = false; // re enable the submit button
        console.log(error);
      }
    );
  }
}
