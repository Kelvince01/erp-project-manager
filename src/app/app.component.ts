import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ConfigService } from '@core/services/config.service';
import { IUser } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { SeoService } from '@shared/services/seo.service';
import { PrimeNGConfig } from 'primeng/api';
import { filter, map, mergeMap } from 'rxjs';

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
    private configService: ConfigService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
  ) {
    this.user = this.accountService.currentUser as any;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.myKey = ConfigService.Config.MyKey;

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        let seoData = data['seo'];
        this.seoService.updateTitle(seoData['title']);
        this.seoService.updateMetaTags(seoData['metaTags']);
      });
  }

  logout() {
    this.accountService.logOut();
  }
}
