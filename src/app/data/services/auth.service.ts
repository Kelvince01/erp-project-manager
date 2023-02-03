import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@envs/environment';
import { IUser } from '@models/user.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser | null>;
  public user: Observable<IUser | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<IUser>(`${environment.apiUrl}/authentication`, {
        Email: email,
        Password: password,
        strategy: 'local',
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: IUser) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  getAll() {
    return this.http.get<IUser[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<IUser>(`${environment.apiUrl}/users/${id}`);
  }

  update(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
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

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue?.UsersID) {
          this.logout();
        }
        return x;
      })
    );
  }
}
