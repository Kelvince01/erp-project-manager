import { Injectable } from '@angular/core';
import { IBudget } from '@models/budget.model';
import { MessageService } from 'primeng/api';
import { Observable, from } from 'rxjs';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IBudget): Observable<any> {
    return from(
      this.feathers
        .service('budgets')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Budget created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create budget!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('budgets').get(id));
  }

  budgets$(query?: any): Observable<any> {
    // get(query?: any) {
    return from(
      this.feathers.service('budgets').find({ query: { $limit: 1, ...query } })
    );
  }

  update(id: string, payload: Partial<IBudget>): Observable<any> {
    return from(
      this.feathers.service('budgets').update(payload.BudgetID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('budgets').remove(id));
  }
}
