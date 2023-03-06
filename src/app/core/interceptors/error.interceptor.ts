import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Logger } from '@core/services/logger.service';
import { environment } from '@envs/environment';

const log = new Logger('ErrorHandlerInterceptor');

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private accountService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        // if ([401, 403].includes(err.status) && this.accountService.userValue) {
        // auto logout if 401 or 403 response returned from api
        // this.accountService.logout();
        // }
        this.errorHandler(err);

        const error = err.error?.message || err.statusText;
        return throwError(() => error);
      })
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }
    throw response;
  }
}
