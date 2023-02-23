import { Injectable } from '@angular/core';
import { IEmployee } from '@models/employee.model';
import { MessageService } from 'primeng/api';
import { FeathersService } from './feathers.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IEmployee): Observable<any> {
    return from(
      this.feathers
        .service('employees')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Employee created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create project!',
          })
        )
    );
  }

  getById(id: number): Observable<any> {
    return from(this.feathers.service('employees').get(id));
  }

  employees$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('employees')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  update(payload: Partial<IEmployee>): Observable<any> {
    return from(
      this.feathers.service('employees').update(payload.EmployeeID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('employees').remove(id));
  }

  suppliers$(): Observable<any> {
    return from(
      <any>this.feathers
        .service('employees')
        // .watch()
        .find({
          query: {
            $sort: { LastUpdated: -1 },
            isSupplier: true,
            $limit: 25,
          },
        })
    );
  }
}
