import { from, Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ICurrency } from '@models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: ICurrency): Observable<any> {
    return from(
      this.feathers
        .service('currencies')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Currency created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create currency!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('currencies').get(id));
  }

  currencies$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('currencies')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  update(payload: Partial<ICurrency>): Observable<any> {
    return from(
      this.feathers.service('currencies').update(payload.CurrencyID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('currencies').remove(id));
  }
}
