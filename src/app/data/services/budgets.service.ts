import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { IBudget } from '@models/budget.model';
import { HttpErrorHandlerService } from '@shared/services/http-error-handler.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  private url: string = `${environment.apiUrl}/budgets`;

  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) {}

  create(asset: IBudget): Observable<any> {
    return this.http
      .post<IBudget>(this.url, {})
      .pipe(catchError(this.eh.handleError));
  }

  getById(id: string): Observable<any> {
    return this.http
      .get<IBudget>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  get(): Observable<any> {
    return this.http
      .get<IBudget[]>(`${this.url}`)
      .pipe(catchError(this.eh.handleError));
  }

  update(id: string, asset: Partial<IBudget>): Observable<any> {
    return this.http
      .patch<IBudget>(`${this.url}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<IBudget>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
