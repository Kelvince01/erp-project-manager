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

  constructor(private accountService: AuthService) {
    // this.accountService.user.subscribe((x) => (this.user = x));
    this.user = this.accountService.currentUser as any;
  }

  ngOnInit() {}

  logout() {
    this.accountService.logOut();
  }
}
