import { Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { IDepartment } from './../models/department.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private http: HttpClient, private feathers: FeathersService) {}

  // get(): Observable<IDepartment[]> {
  get(): Observable<any> {
    return this.http.get<IDepartment[]>('http://localhost:3030/departments');
    // return (
    //   (<any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
    //     .service('departments'))
    //     // .watch()
    //     .find()
    // );
  }

  create(payload: IDepartment) {
    return this.http.post<IDepartment>(
      'http://localhost:3030/departments',
      payload
    );
  }

  update(payload: IDepartment) {
    return this.http.patch<IDepartment>(
      `http://localhost:3030/departments/${payload.DepartID}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3030/departments/${id}`);
  }
}
