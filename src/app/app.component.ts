import { Component, OnInit } from '@angular/core';
import { IUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { PrimeNGConfig } from 'primeng/api';

import * as $ from 'jquery';

window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ERP-PROJECT MANAGER';
  user?: IUser | null;

  constructor(
    private primengConfig: PrimeNGConfig,
    private accountService: AuthService
  ) {
    this.user = this.accountService.currentUser as any;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  logout() {
    this.accountService.logOut();
  }
}
