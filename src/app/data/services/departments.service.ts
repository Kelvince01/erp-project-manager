import { IDepartment } from './../models/department.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<IDepartment[]>('http://localhost:3030/departments');
  }

  create(payload: IDepartment) {
    return this.http.post<IDepartment>(
      'http://localhost:3030/departments',
      payload
    );
  }

  update(payload: IDepartment) {
    return this.http.put<IDepartment>(
      `http://localhost:3030/departments/${payload.DepartID}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3030/departments/${id}`);
  }
}
