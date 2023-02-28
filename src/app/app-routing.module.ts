// import { PageNotFoundComponent } from '@shared/components/page-not-found';
import { NgModule } from '@angular/core';
// import { PageNotFoundComponent } from './../app/core/components/page-not-found/page-not-found.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from '@envs/environment';
import { AuthGuard } from '@utils/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
    data: {
      seo: {
        title: 'Onster Group PM',
        metaTags: [
          { name: 'description', content: 'Onster Group PM' },
          { property: 'og:title', content: 'Authentication' },
          {
            proprety: 'og:description',
            content: 'Onster Group Project Manager',
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
    path: 'accounts',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin',
      seo: {
        title: 'Onster Group PM | Admin',
        metaTags: [{ name: 'description', content: 'Onster Group PM Admin' }],
      },
    },
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
