import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  user: any;

  constructor(private router: Router, private accountService: AuthService) {
    // redirect to home if already logged in
    this.user = accountService.userValue as any;

    if (this.user) {
      this.router.navigate(['/']);
    }
  }
}
