import { Injectable } from '@angular/core';
import { ISms } from '@models/sms.model';
import { MessageService } from 'primeng/api';
import { Observable, from } from 'rxjs';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: ISms): Observable<any> {
    return from(
      this.feathers
        .service('sms')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'SMS created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create SMS!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('sms').get(id));
  }

  sms$(query?: any): Observable<any> {
    return from(
      this.feathers.service('sms').find({ query: { $limit: 20, ...query } })
    );
  }

  update(payload: Partial<ISms>): Observable<any> {
    return from(this.feathers.service('sms').update(payload.smsID!, payload));
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('sms').remove(id));
  }
}
