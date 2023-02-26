import { Injectable } from '@angular/core';
import { IItem } from '@models/item.model';
import { MessageService } from 'primeng/api';
import { Observable, from } from 'rxjs';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IItem): Observable<any> {
    return from(
      this.feathers
        .service('items')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Role created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create item!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('items').get(id));
  }

  items$(query?: any): Observable<any> {
    return from(
      this.feathers.service('items').find({ query: { $limit: 20, ...query } })
    );
  }

  update(id: string, payload: Partial<IItem>): Observable<any> {
    return from(
      this.feathers.service('items').update(payload.ItemID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('items').remove(id));
  }
}
