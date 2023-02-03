import { Component } from '@angular/core';
import { IUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user: IUser | null;

  constructor(private accountService: AuthService) {
    this.user = this.accountService.userValue;
  }
}
