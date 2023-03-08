import { from, map, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FeathersService } from '@services/feathers.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private feathers: FeathersService,
    @Inject(MessageService) private messages: MessageService
  ) {}

  users$(query?: any): Observable<any> {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return from(
      this.feathers
        .service('users')
        // .watch()
        .find({
          query: {
            $sort: { LastUpdated: -1 },
            $limit: 25,
            ...query,
          },
        })
    );
  }

  getById(id: number): Observable<any> {
    return from(this.feathers.service('users').get(id));
  }

  signup(data: any): Observable<any> {
    return from(
      this.feathers
        .service('users')
        .create({ ...data })
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

  update(payload: Partial<IUser>): Observable<any> {
    return from(this.feathers.service('sms').update(payload.UsersID!, payload));
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('sms').remove(id));
  }

  /*updateOld(id: number, params: any) {
    return this.http.patch(`${environment.apiUrl}/users/${id}`, params).pipe(
      map((x) => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue?.UsersID) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      })
    );
  }

  deleteOld(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue?.UsersID) {
          this.logout();
        }
        return x;
      })
    );
  }*/

  /*private USER_API_URL = 'https://randomuser.me/api/?results=';

  constructor(private store: Store<AppState>, private http: HttpClient) {}

  private toUser(value: any) {
    return {
      name: value.name.first + ' ' + value.name.last,
      email: value.email,
      thumbail: value.picture.large,
    };
  }

  private random(y) {
    return Math.floor(Math.random() * y);
  }

  public run() {
    this.http.get(`${this.USER_API_URL}51`).subscribe((response) => {
      this.store.dispatch({
        type: ACTIONS.USERS_LOADED,
        payload: response.json().results.map(this.toUser),
      });
    });

    setInterval(() => {
      this.store
        .select('users')
        .first()
        .subscribe((users: Array<IUser>) => {
          let getDeletedIndex = () => {
            return this.random(users.length - 1);
          };
          this.http
            .get(`${this.USER_API_URL}${this.random(10)}`)
            .subscribe((response) => {
              this.store.dispatch({
                type: ACTIONS.INCOMMING_DATA,
                payload: {
                  ADD: response.json().results.map(this.toUser),
                  DELETE: new Array(this.random(6))
                    .fill(0)
                    .map(() => getDeletedIndex()),
                },
              });
              this.addFadeClassToNewElements();
            });
        });
    }, 10000);
  }

  private addFadeClassToNewElements() {
    let elements = window.document.getElementsByClassName('user');
    for (let i = 0; i < elements.length; i++) {
      if (elements.item(i)?.className.indexOf('fade') === -1) {
        elements.item(i)?.classList.add('fade');
      }
    }
  }*/
}
