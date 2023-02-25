import { Injectable } from '@angular/core';
import { IJournalBS } from '@models/journal-bs.model';
import { IJournal } from '@models/journal.model';
import { MessageService } from 'primeng/api';
import { Observable, from } from 'rxjs';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root',
})
export class JournalsService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IJournal): Observable<any> {
    return from(
      this.feathers
        .service('journals')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Role created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create journal!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('journals').get(id));
  }

  journals$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('journals')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  update(id: string, payload: Partial<IJournal>): Observable<any> {
    return from(
      this.feathers.service('journals').update(payload.JournalID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('journals').remove(id));
  }

  createBS(payload: IJournalBS): Observable<any> {
    return from(
      this.feathers
        .service('journal-bs')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Role created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create journal bs!',
          })
        )
    );
  }

  getBSById(id: string): Observable<any> {
    return from(this.feathers.service('journal-bs').get(id));
  }

  journalBSs$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('journal-bs')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  updateBS(id: string, payload: Partial<IJournalBS>): Observable<any> {
    return from(
      this.feathers.service('journal-bs').update(payload.JournalID!, payload)
    );
  }

  deleteBS(id: number): Observable<any> {
    return from(this.feathers.service('journal-bs').remove(id));
  }
}
