import { from, Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IClassOfTransaction } from '@models/class-of-transaction.model';

@Injectable({
  providedIn: 'root',
})
export class ClassOfTransactionService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IClassOfTransaction): Observable<any> {
    return from(
      this.feathers
        .service('class-of-transaction')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Class of transaction created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create class of transaction!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('class-of-transaction').get(id));
  }

  classOfTransaction$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('class-of-transaction')
        .find({ query: { $limit: 1, ...query } })
    );
  }

  update(payload: Partial<IClassOfTransaction>): Observable<any> {
    return from(
      this.feathers
        .service('class-of-transaction')
        .update(payload.ClassID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('class-of-transaction').remove(id));
  }
}
