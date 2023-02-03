import { Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompanyInfo } from '@models/company-info.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyInfoService {
  constructor(private http: HttpClient, private feathers: FeathersService) {}

  get(): Observable<any> {
    // return this.http.get<ICompanyInfo[]>('http://localhost:3030/company-info');
    return (
      (<any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
        .service('company-info'))
        // .watch()
        .find()
    );
  }

  create(payload: ICompanyInfo) {
    return this.http.post<ICompanyInfo>(
      'http://localhost:3030/company-info',
      payload
    );
  }

  update(payload: ICompanyInfo) {
    return this.http.put<ICompanyInfo>(
      `http://localhost:3030/company-info/${payload.CompanyID}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3030/company-info/${id}`);
  }
}
