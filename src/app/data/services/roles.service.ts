import { Injectable } from '@angular/core';
import { IRole } from '@models/role.model';
import { MessageService } from 'primeng/api';
import { from, Observable } from 'rxjs';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IRole): Observable<any> {
    return from(
      this.feathers
        .service('roles')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Role created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create role!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('roles').get(id));
  }

  roles$(query?: any): Observable<any> {
    // get(query?: any) {
    return from(
      this.feathers.service('roles').find({ query: { $limit: 20, ...query } })
    );
  }

  update(id: string, payload: Partial<IRole>): Observable<any> {
    return from(this.feathers.service('roles').patch(payload.RoleID!, payload));
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('roles').remove(id));
  }
}
