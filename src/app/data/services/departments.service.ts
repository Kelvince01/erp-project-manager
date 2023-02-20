import { from, Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { IDepartment } from './../models/department.model';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IDepartment): Observable<any> {
    return from(
      this.feathers
        .service('departments')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Department created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create department!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('departments').get(id));
  }

  departments$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('departments')
        .find({ query: { $limit: 1, ...query } })
    );
  }

  update(payload: Partial<IDepartment>): Observable<any> {
    return from(
      this.feathers.service('departments').update(payload.DepartID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('departments').remove(id));
  }
}
