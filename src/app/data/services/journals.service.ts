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
      this.feathers.service('journals').create({
        ...payload,
      })
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

  // update(id: number, payload: Partial<IJournal>): Observable<any> {
  update(id: number, payload: any): Observable<any> {
    return from(this.feathers.service('journals').patch(id, payload));
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('journals').remove(id));
  }

  createBS(payload: IJournalBS): Observable<any> {
    return from(
      this.feathers.service('journal-bs').create({
        ...payload,
      })
    );

    /*
    .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Journal BS created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create journal bs!',
          })
        )
    */
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
      this.feathers.service('journal-bs').patch(payload.JournalID!, payload)
    );
  }

  deleteBS(id: number): Observable<any> {
    return from(this.feathers.service('journal-bs').remove(id));
  }
}
