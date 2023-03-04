import { from, Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { Injectable } from '@angular/core';
import { ICompanyInfo } from '@models/company-info.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CompanyInfoService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: ICompanyInfo): Observable<any> {
    return from(
      this.feathers
        .service('companies')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Company Info created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create company!',
          })
        )
    );
  }

  getById(id: number): Observable<any> {
    return from(this.feathers.service('companies').get(id));
  }

  companies$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('companies')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  update(payload: Partial<ICompanyInfo>): Observable<any> {
    return from(
      this.feathers.service('companies').update(payload.CompanyID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('companies').remove(id));
  }
}
