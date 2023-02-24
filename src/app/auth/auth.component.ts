import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private router: Router, private accountService: AuthService) {
    // redirect to home if already logged in
    if (this.accountService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
}
