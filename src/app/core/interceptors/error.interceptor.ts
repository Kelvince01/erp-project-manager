import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Logger } from '@core/services/logger.service';
import { environment } from '@envs/environment';
import { MessageService } from 'primeng/api';

const log = new Logger('ErrorHandlerInterceptor');

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AuthService,
    private messageService: MessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;

    return next.handle(request).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        // Operation failed; error is an HttpErrorResponse
        (error) => (ok = 'failed')
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`;
        this.messageService.add({ detail: msg });
      }),

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
