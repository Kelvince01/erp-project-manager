import { Injectable } from '@angular/core';
import { IITemStatus } from '@models/item-status.model';
import { IItemType } from '@models/item-type.model';
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
      this.feathers.service('items').create({
        ...payload,
      })
      // .then(() =>
      //   this.messages.add({ severity: 'success', detail: 'Role created.' })
      // )
      // .catch((err: any) =>
      //   this.messages.add({
      //     severity: 'error',
      //     detail: 'Could not create item!',
      //   })
      // )
    );
  }

  getById(id: number): Observable<any> {
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

  createType(payload: IItemType): Observable<any> {
    return from(
      this.feathers
        .service('item-types')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Item type created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create item type!',
          })
        )
    );
  }

  getTypeById(id: number): Observable<any> {
    return from(this.feathers.service('item-types').get(id));
  }

  itemTypes$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('item-types')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  updateType(id: string, payload: Partial<IItemType>): Observable<any> {
    return from(
      this.feathers.service('item-types').update(payload.ItemTypeID!, payload)
    );
  }

  deleteType(id: number): Observable<any> {
    return from(this.feathers.service('item-types').remove(id));
  }

  createStatus(payload: IITemStatus): Observable<any> {
    return from(
      this.feathers
        .service('item-status')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Item Status created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create item status!',
          })
        )
    );
  }

  getByStatusId(id: string): Observable<any> {
    return from(this.feathers.service('item-status').get(id));
  }

  itemStatuses$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('item-status')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  updateStatus(id: string, payload: Partial<IITemStatus>): Observable<any> {
    return from(
      this.feathers
        .service('item-status')
        .update(payload.ItemStatusID!, payload)
    );
  }

  deleteStatus(id: number): Observable<any> {
    return from(this.feathers.service('item-status').remove(id));
  }
}
