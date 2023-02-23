import { ConfigService as Config } from '@services/config.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NgModule, isDevMode, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './data/reducers/app.reduce';
import { AdminModule } from '@admin/admin.module';
import { MainModule } from '@main/main.module';
import { AuthModule } from '@auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@utils/interceptors/error.interceptor';
import { JwtInterceptor } from '@utils/interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from '@utils/interceptors/spinner.interceptor';
import { FeathersService } from '@services/feathers.service';
import { AuthService } from '@services/auth.service';
import { AuthGuard } from '@utils/guards/auth.guard';
import { configFactory, ConfigService } from '@core/services/config.service';

export function appInitializer(accountService: AuthService) {
  return () =>
    new Promise((resolve) => {
      // attempt to refresh token on app start up to auto authenticate
      // accountService.refreshToken()
      //     .subscribe()
      //     .add(resolve);
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise-fade' }),
    StoreModule.forRoot({ appState: appReducer }),
    SharedModule,
    CoreModule,
    AuthModule,
    MainModule,
    AdminModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      multi: true,
      deps: [ConfigService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    FeathersService,
    AuthService,
    AuthGuard,
    Config,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
