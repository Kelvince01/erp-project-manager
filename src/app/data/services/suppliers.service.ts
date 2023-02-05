import { ISupplier } from '@models/supplier.model';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeathersService } from './feathers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  get(query?: any): Observable<any> {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return (
      (<any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
        .service('suppliers'))
        // .watch()
        .find(query)
    );
  }

  messages$() {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return (
      this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
        .service('messages')
        // .watch()
        .find({
          query: {
            $sort: { createdAt: -1 },
            $limit: 25,
          },
        })
    );
  }

  getById(id: number) {
    return this.feathers.service('suppliers').get(id);
  }

  create(payload: ISupplier) {
    return this.feathers
      .service('messages')
      .create({
        ...payload,
      })
      .then(() =>
        this.messages.add({ severity: 'success', detail: 'User created.' })
      )
      .catch((err) =>
        this.messages.add({
          severity: 'error',
          detail: 'Could not create user!',
        })
      );
  }

  update(payload: ISupplier) {
    return this.feathers
      .service('suppliers')
      .update(payload.EmployeeID!, payload);
  }

  delete(id: number) {
    return this.feathers.service('suppliers').remove(id);
  }
}
