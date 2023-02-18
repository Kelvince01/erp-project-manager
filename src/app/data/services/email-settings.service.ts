import { Inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeathersService } from './feathers.service';
import { from, Observable } from 'rxjs';
import { IEmailSetting } from '@models/email-setting.model';

@Injectable({
  providedIn: 'root',
})
export class EmailSettingsService {
  constructor(
    private feathers: FeathersService,
    @Inject(MessageService) private messages: MessageService
  ) {}

  get(): Observable<any> {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return from(
      <any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
        .service('email-settings')
        // .watch()
        .find({
          query: {
            $limit: 25,
          },
        })
    );
  }

  getById(id: number) {
    return from(this.feathers.service('email-settings').get(id));
  }

  create(payload: IEmailSetting): Observable<any> {
    return from(
      this.feathers
        .service('email-settings')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'User created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create user!',
          })
        )
    );
  }

  update(payload: IEmailSetting): Observable<any> {
    return from(
      this.feathers.service('email-settings').update(payload.ID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('email-settings').remove(id));
  }
}
