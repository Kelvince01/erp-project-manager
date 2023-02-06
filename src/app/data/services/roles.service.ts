import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { IRole } from '@models/role.model';
import { HttpErrorHandlerService } from '@shared/services/http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private url: string = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) {}

  create(asset: IRole): Observable<any> {
    return this.http
      .post<IRole>(this.url, {})
      .pipe(catchError(this.eh.handleError));
  }

  getById(id: string): Observable<any> {
    return this.http
      .get<IRole>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  get(): Observable<any> {
    return this.http
      .get<IRole[]>(`${this.url}`)
      .pipe(catchError(this.eh.handleError));
  }

  update(id: string, asset: Partial<IRole>): Observable<any> {
    return this.http
      .patch<IRole>(`${this.url}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<IRole>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
