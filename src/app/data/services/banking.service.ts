import { IAccount } from './../models/account.model';
import { Injectable } from '@angular/core';
import { IBank } from '@models/bank.model';
import { Observable, from } from 'rxjs';
import { FeathersService } from './feathers.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class BankingService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IBank): Observable<any> {
    return from(
      this.feathers
        .service('banks')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Bank created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create bank!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('banks').get(id));
  }

  banks$(query?: any): Observable<any> {
    // get(query?: any) {
    return from(
      this.feathers.service('banks').find({ query: { $limit: 1, ...query } })
    );
  }

  update(payload: Partial<IBank>): Observable<any> {
    return from(
      this.feathers.service('banks').update(payload.BankID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('banks').remove(id));
  }

  createAccount(payload: IAccount): Observable<any> {
    return from(
      this.feathers
        .service('accounts')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Account created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create account!',
          })
        )
    );
  }

  getAccountById(id: string): Observable<any> {
    return from(this.feathers.service('accounts').get(id));
  }

  accounts$(query?: any): Observable<any> {
    return from(
      this.feathers.service('accounts').find({ query: { $limit: 1, ...query } })
    );
  }

  updateAccount(id: string, payload: Partial<IAccount>): Observable<any> {
    return from(
      this.feathers.service('accounts').update(payload.ProjectID!, payload)
    );
  }

  deleteAccount(id: number): Observable<any> {
    return from(this.feathers.service('accounts').remove(id));
  }

  createAccountType(payload: IAccount): Observable<any> {
    return from(
      this.feathers
        .service('account-types')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Account created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create account!',
          })
        )
    );
  }

  getAccountTypeById(id: string): Observable<any> {
    return from(this.feathers.service('account-types').get(id));
  }

  accountTypes$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('account-types')
        .find({ query: { $limit: 1, ...query } })
    );
  }

  updateAccountType(id: string, payload: Partial<IAccount>): Observable<any> {
    return from(
      this.feathers.service('account-types').update(payload.ProjectID!, payload)
    );
  }

  deleteAccountType(id: number): Observable<any> {
    return from(this.feathers.service('account-types').remove(id));
  }
}
