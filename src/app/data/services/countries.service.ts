import { from, Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ICountry } from '@models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: ICountry): Observable<any> {
    return from(
      this.feathers
        .service('countries')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Country created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create country!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('countries').get(id));
  }

  countries$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('countries')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  update(payload: Partial<ICountry>): Observable<any> {
    return from(
      this.feathers.service('countries').update(payload.CountryID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('countries').remove(id));
  }
}
