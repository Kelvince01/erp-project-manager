import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@envs/environment';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          seo: {
            title: 'Onster Group PM',
            metaTags: [
              { name: 'description', content: 'Onster Group PM Home' },
              { property: 'og:title', content: 'Home' },
              {
                property: 'og:description',
                content: 'Onster Group Project Manager | Home',
              },
              {
                property: 'og:image',
                content: environment.appUrl + 'assets/images/company-logo.png',
              },
              { property: 'og:url', content: environment.appUrl + '' },
              { name: 'twitter:card', content: 'summary_large_image' },
            ],
          },
        },
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          seo: {
            title: 'Onster Group PM | About',
            metaTags: [
              {
                name: 'description',
                content: 'Onster Group PM About',
              },
              { property: 'og:title', content: 'About' },
              {
                property: 'og:description',
                content: 'Onster Group PM About',
              },
              {
                property: 'og:image',
                content: environment.appUrl + 'assets/images/company-logo.png',
              },
              { property: 'og:url', content: environment.appUrl + 'about' },
              { name: 'twitter:card', content: 'summary_large_image' },
            ],
          },
        },
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          seo: {
            title: 'Onster Group PM | Contact',
            metaTags: [
              {
                name: 'description',
                content: 'Onster Group PM Contact',
              },
              { property: 'og:title', content: 'Contact' },
              {
                property: 'og:description',
                content: 'Onster Group PM Contact',
              },
              {
                property: 'og:image',
                content: environment.appUrl + 'assets/images/company-logo.png',
              },
              { property: 'og:url', content: environment.appUrl + 'contact' },
              { name: 'twitter:card', content: 'summary_large_image' },
            ],
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
