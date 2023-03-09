import { Injectable } from '@angular/core';
import { ITransactionType } from '@models/transaction-type.model';
import { MessageService } from 'primeng/api';
import { Observable, from } from 'rxjs';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionTypesService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: ITransactionType): Observable<any> {
    return from(
      this.feathers
        .service('trans-types')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Transaction Type created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create Transaction Type!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('trans-types').get(id));
  }

  transTypes$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('trans-types')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  update(payload: Partial<ITransactionType>): Observable<any> {
    return from(
      this.feathers.service('trans-types').update(payload.TransTypeID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('trans-types').remove(id));
  }
}
