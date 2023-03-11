import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmail } from '@models/email.model';
import { MessageService } from 'primeng/api';
import { Observable, from, map } from 'rxjs';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root',
})
export class EmailsService {
  private mailApi = 'https://mailthis.to/onstergroup';

  constructor(
    private feathers: FeathersService,
    private messages: MessageService,
    private http: HttpClient
  ) {}

  create(payload: IEmail): Observable<any> {
    return from(
      this.feathers
        .service('emails')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Email created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create email!',
          })
        )
    );
  }

  PostMessage(input: any) {
    return this.http.post(this.mailApi, input, { responseType: 'text' }).pipe(
      map(
        (response) => {
          if (response) {
            return response;
          } else {
            return null;
          }
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('emails').get(id));
  }

  emails$(query?: any): Observable<any> {
    return from(
      this.feathers.service('emails').find({ query: { $limit: 20, ...query } })
    );
  }

  update(payload: Partial<IEmail>): Observable<any> {
    return from(
      this.feathers.service('emails').patch(payload.EmailID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('emails').remove(id));
  }
}
