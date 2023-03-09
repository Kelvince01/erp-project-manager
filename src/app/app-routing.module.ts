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
