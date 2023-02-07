import { Injectable } from '@angular/core';
import { IEmployee } from '@models/employee.model';
import { MessageService } from 'primeng/api';
import { FeathersService } from './feathers.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(
    private http: HttpClient,
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  getF(query?: any): Observable<any> {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return (
      (<any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
        .service('employees'))
        // .watch()
        .find(query)
    );
  }

  get(): Observable<any> {
    return this.http.get<IEmployee[]>('http://localhost:3030/employees');
    // .pipe(map((response) => console.log(response)));
  }

  getSuppliers(): Observable<any> {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return <any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
      .service('employees')
      // .watch()
      .find({
        query: {
          // $sort: { createdAt: -1 },
          // isSupplier: true,
          $limit: 25,
        },
      });
  }

  getById(id: number) {
    return this.feathers.service('employees').get(id);
  }

  create(payload: IEmployee) {
    return this.feathers
      .service('employees')
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

  update(payload: IEmployee) {
    return this.feathers
      .service('employees')
      .update(payload.EmployeeID!, payload);
  }

  delete(id: number) {
    return this.feathers.service('employees').remove(id);
  }
}
