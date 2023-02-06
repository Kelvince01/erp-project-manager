import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { IEmployeeRole } from '@models/employee-role.model';
import { HttpErrorHandlerService } from '@shared/services/http-error-handler.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRolesService {
  private url: string = `${environment.apiUrl}/employee-roles`;

  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) {}

  create(asset: IEmployeeRole): Observable<any> {
    return this.http
      .post<IEmployeeRole>(this.url, {})
      .pipe(catchError(this.eh.handleError));
  }

  getById(id: string): Observable<any> {
    return this.http
      .get<IEmployeeRole>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  get(): Observable<any> {
    return this.http
      .get<IEmployeeRole[]>(`${this.url}`)
      .pipe(catchError(this.eh.handleError));
  }

  update(id: string, asset: Partial<IEmployeeRole>): Observable<any> {
    return this.http
      .patch<IEmployeeRole>(`${this.url}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<IEmployeeRole>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
