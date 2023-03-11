import { from, Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ILocation } from '@models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: ILocation): Observable<any> {
    return from(
      this.feathers
        .service('locations')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Location created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create location!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('locations').get(id));
  }

  locations$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('locations')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  update(payload: Partial<ILocation>): Observable<any> {
    return from(
      this.feathers.service('locations').patch(payload.LocationID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('locations').remove(id));
  }
}
