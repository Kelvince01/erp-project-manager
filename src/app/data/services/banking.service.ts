import { IAccount } from './../models/account.model';
import { Injectable } from '@angular/core';
import { IBank } from '@models/bank.model';
import { Observable, from } from 'rxjs';
import { FeathersService } from './feathers.service';
import { MessageService } from 'primeng/api';
import { IMainAccount } from '@models/main-account.model';
import { IAccountPosting } from '@models/account-posting.model';
import { IPaymentMethod } from '@models/payment-method.model';

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
      this.feathers.service('banks').find({ query: { $limit: 20, ...query } })
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
            detail: err,
            // detail: 'Could not create account!',
          })
        )
    );
  }

  getAccountById(id: string): Observable<any> {
    return from(this.feathers.service('accounts').get(id));
  }

  accounts$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('accounts')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  updateAccount(payload: Partial<IAccount>): Observable<any> {
    return from(
      this.feathers.service('accounts').update(payload.AccountID!, payload)
    );
  }

  deleteAccount(id: number): Observable<any> {
    return from(this.feathers.service('accounts').remove(id));
  }

  createMainAccount(payload: IMainAccount): Observable<any> {
    return from(
      this.feathers
        .service('main-accounts')
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

  getAccountMainById(id: string): Observable<any> {
    return from(this.feathers.service('main-accounts').get(id));
  }

  mainAccounts$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('main-accounts')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  updateMainAccount(
    id: string,
    payload: Partial<IMainAccount>
  ): Observable<any> {
    return from(
      this.feathers.service('main-accounts').update(payload.AccountID!, payload)
    );
  }

  deleteMainAccount(id: number): Observable<any> {
    return from(this.feathers.service('main-accounts').remove(id));
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
        .find({ query: { $limit: 20, ...query } })
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

  createPaymentMethod(payload: IPaymentMethod): Observable<any> {
    return from(
      this.feathers
        .service('payment-methods')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Payment method created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create payment method!',
          })
        )
    );
  }

  getPaymentMethodById(id: string): Observable<any> {
    return from(this.feathers.service('payment-methods').get(id));
  }

  paymentMethods$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('payment-methods')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  updatePaymentMethod(id: string, payload: Partial<IPaymentMethod>): Observable<any> {
    return from(
      this.feathers.service('payment-methods').update(payload.PymtMethodID!, payload)
    );
  }

  deletePaymentMethod(id: number): Observable<any> {
    return from(this.feathers.service('payment-methods').remove(id));
  }

  createAccountPosting(payload: IAccountPosting): Observable<any> {
    return from(
      this.feathers
        .service('account-posting')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Account posting created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create account posting!',
          })
        )
    );
  }

  getAccountPostingById(id: string): Observable<any> {
    return from(this.feathers.service('account-posting').get(id));
  }

  accountPostings$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('account-posting')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  updateAccountPosting(payload: Partial<IAccountPosting>): Observable<any> {
    return from(
      this.feathers
        .service('account-posting')
        .update(payload.AccountID!, payload)
    );
  }

  deleteAccountPosting(id: number): Observable<any> {
    return from(this.feathers.service('account-posting').remove(id));
  }
}
