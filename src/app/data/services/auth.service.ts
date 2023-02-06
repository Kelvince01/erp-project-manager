import { FeathersService } from '@services/feathers.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@envs/environment';
import { IUser } from '@models/user.model';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser | null>;
  public user: Observable<IUser | null>;
  baseUrl: string = '';
  isLogin = false;
  roleAs: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private feathers: FeathersService
  ) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public currentUser() {
    return Promise.resolve(this.feathers.getCurrentUser());
  }

  public logIn(credentials?: any): Promise<any> {
    return this.feathers.authenticate(credentials);
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true') this.isLogin = true;
    else this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE')!;
    return this.roleAs;
  }

  verifyEmail(token: string) {
    return this.http.post(`${this.baseUrl}/verify-email`, { token });
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  validateResetToken(token: string) {
    return this.http.post(`${this.baseUrl}/validate-reset-token`, { token });
  }

  resetPassword(password: string, confirmPassword: string) {
    return this.http.post(`${this.baseUrl}/reset-password`, {
      password,
      confirmPassword,
    });
  }

  public logOut() {
    this.feathers.logout();
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    localStorage.clear();
    this.router.navigate(['/']);
    return of({ success: this.isLogin, role: '' });
  }

  getAuthToken(): string {
    return localStorage.getItem('access_token')!;
  }

  login(email: string, password: string) {
    return (
      this.http
        // .post<IUser>(`${environment.apiUrl}/authentication`, {
        .post<any>(`${environment.apiUrl}/authentication`, {
          Email: email,
          Password: password,
          strategy: 'local',
        })
        .pipe(
          map((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              'access_token',
              JSON.stringify(user.accessToken)
              // user.accessToken
            );
            localStorage.setItem('user', JSON.stringify(user.user));

            this.userSubject.next(user);
            return user;
          })
        )
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/accounts/login']);
    return of({ success: this.isLogin, role: '' });
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
