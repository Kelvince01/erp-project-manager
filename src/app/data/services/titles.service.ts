import { from, Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ITitle } from '@models/title.model';

@Injectable({
  providedIn: 'root',
})
export class TitlesService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: ITitle): Observable<any> {
    return from(
      this.feathers
        .service('titles')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Title created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create title!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('titles').get(id));
  }

  titles$(query?: any): Observable<any> {
    return from(
      this.feathers.service('titles').find({ query: { $limit: 1, ...query } })
    );
  }

  update(payload: Partial<ITitle>): Observable<any> {
    return from(
      this.feathers.service('titles').update(payload.TitleID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('titles').remove(id));
  }
}
