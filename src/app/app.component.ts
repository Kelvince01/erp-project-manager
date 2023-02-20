import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@core/services/config.service';
import { IUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { PrimeNGConfig } from 'primeng/api';

// import * as $ from 'jquery';

// window['$'] = window['jQuery'] = $;

// "node_modules/@popperjs/core/dist/esm/popper.min.js",

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ERP-PROJECT MANAGER';
  user?: IUser | null;
  myKey?: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private accountService: AuthService,
    private configService: ConfigService
  ) {
    this.user = this.accountService.currentUser as any;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.myKey = ConfigService.Config.MyKey;
  }

  logout() {
    this.accountService.logOut();
  }
}
