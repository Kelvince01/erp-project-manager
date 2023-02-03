import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<IUser[]>('http://localhost:3030/users');
  }

  getById(id: number) {
    return this.http.get<IUser>(`http://localhost:3030/users/${id}`);
  }

  create(payload: IUser) {
    return this.http.post<IUser>('http://localhost:3030/users', payload);
  }

  update(payload: IUser) {
    return this.http.put<IUser>(
      `http://localhost:3030/users/${payload.UsersID}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3030/users/${id}`);
  }

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
