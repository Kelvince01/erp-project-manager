import { IAccount } from './../models/account.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { IBank } from '@models/bank.model';
import { HttpErrorHandlerService } from '@shared/services/http-error-handler.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankingService {
  private url: string = `${environment.apiUrl}/banks`;
  private urlAccount: string = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) {}

  create(asset: IBank): Observable<any> {
    return this.http
      .post<IBank>(this.url, {})
      .pipe(catchError(this.eh.handleError));
  }

  getById(id: string): Observable<any> {
    return this.http
      .get<IBank>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  get(): Observable<any> {
    return this.http
      .get<IBank[]>(`${this.url}`)
      .pipe(catchError(this.eh.handleError));
  }

  update(id: string, asset: Partial<IBank>): Observable<any> {
    return this.http
      .patch<IBank>(`${this.url}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete<IBank>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  createAccount(asset: IAccount): Observable<any> {
    return this.http
      .post<IAccount>(this.urlAccount, {})
      .pipe(catchError(this.eh.handleError));
  }

  getAccountById(id: string): Observable<any> {
    return this.http
      .get<IAccount>(`${this.urlAccount}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  getAccounts(): Observable<any> {
    return this.http
      .get<IAccount[]>(`${this.urlAccount}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateAccount(id: string, asset: Partial<IAccount>): Observable<any> {
    return this.http
      .patch<IAccount>(`${this.urlAccount}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  deleteAccount(id: number): Observable<any> {
    return this.http
      .delete<IAccount>(`${this.urlAccount}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
