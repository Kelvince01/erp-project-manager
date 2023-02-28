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
                proprety: 'og:description',
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
                proprety: 'og:description',
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
