import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@envs/environment';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          seo: {
            title: 'Onster Group PM | Login',
            metaTags: [
              {
                name: 'description',
                content: 'Onster Group PM Login',
              },
              { property: 'og:title', content: 'Login' },
              {
                proprety: 'og:description',
                content: 'Onster Group PM Login',
              },
              {
                property: 'og:image',
                content: environment.appUrl + 'assets/images/company-logo.png',
              },
              {
                property: 'og:url',
                content: environment.appUrl + 'accounts/login',
              },
              { name: 'twitter:card', content: 'summary_large_image' },
            ],
          },
        },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          seo: {
            title: 'Onster Group PM | Register',
            metaTags: [
              {
                name: 'description',
                content: 'Onster Group PM Register',
              },
              { property: 'og:title', content: 'Register' },
              {
                proprety: 'og:description',
                content: 'Onster Group PM Register',
              },
              {
                property: 'og:image',
                content: environment.appUrl + 'assets/images/company-logo.png',
              },
              {
                property: 'og:url',
                content: environment.appUrl + 'accounts/register',
              },
              { name: 'twitter:card', content: 'summary_large_image' },
            ],
          },
        },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          seo: {
            title: 'Onster Group PM | Forgot Password',
            metaTags: [
              {
                name: 'description',
                content: 'Onster Group PM Forgot Password',
              },
              { property: 'og:title', content: 'Forgot Password' },
              {
                proprety: 'og:description',
                content: 'Onster Group PM Forgot Password',
              },
              {
                property: 'og:image',
                content: environment.appUrl + 'assets/images/company-logo.png',
              },
              {
                property: 'og:url',
                content: environment.appUrl + 'accounts/forgot-password',
              },
              { name: 'twitter:card', content: 'summary_large_image' },
            ],
          },
        },
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {
          seo: {
            title: 'Onster Group PM | Reset Password',
            metaTags: [
              {
                name: 'description',
                content: 'Onster Group PM Reset Password',
              },
              { property: 'og:title', content: 'Reset Password' },
              {
                proprety: 'og:description',
                content: 'Onster Group PM Reset Password',
              },
              {
                property: 'og:image',
                content: environment.appUrl + 'assets/images/company-logo.png',
              },
              {
                property: 'og:url',
                content: environment.appUrl + 'accounts/reset-password',
              },
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
export class AuthRoutingModule {}
