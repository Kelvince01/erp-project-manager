import { Component, OnInit } from '@angular/core';
import { IUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user?: IUser | null;
  loggedIn;

  constructor(private accountService: AuthService) {
    this.user = this.accountService.currentUser as any;
    this.loggedIn = this.accountService.isAuthenticated();
  }

  ngOnInit() {}

  logout() {
    this.accountService.logOut();
    this.loggedIn = false;
  }
}
