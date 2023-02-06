import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { IProject } from '@models/project.model';
import { HttpErrorHandlerService } from '@shared/services/http-error-handler.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  private url: string = `${environment.apiUrl}/programs`;

  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) {}

  create(asset: IProject): Observable<any> {
    return this.http
      .post<IProject>(this.url, {})
      .pipe(catchError(this.eh.handleError));
  }

  getById(id: string): Observable<any> {
    return this.http
      .get<IProject>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  get(): Observable<any> {
    return this.http
      .get<IProject[]>(`${this.url}`)
      .pipe(catchError(this.eh.handleError));
  }

  update(id: string, asset: Partial<IProject>): Observable<any> {
    return this.http
      .patch<IProject>(`${this.url}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<IProject>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
