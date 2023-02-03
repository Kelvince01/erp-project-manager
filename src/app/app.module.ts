import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './data/reducers/app.reduce';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from '@admin/admin.module';
import { MainModule } from '@main/main.module';
import { AuthModule } from '@auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@utils/interceptors/error.interceptor';
import { JwtInterceptor } from '@utils/interceptors/jwt.interceptor';
// import { FeathersService } from '@services/feathers.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ appState: appReducer }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // FeathersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
