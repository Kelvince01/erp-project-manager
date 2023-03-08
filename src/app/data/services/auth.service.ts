import { FeathersService } from '@services/feathers.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@models/user.model';
import { BehaviorSubject, Observable, map, of, from } from 'rxjs';
import { LocalService } from '@shared/services/local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject!: BehaviorSubject<IUser | null>;
  public user!: Observable<IUser | null>;
  // public user$: IUser | null;
  baseUrl: string = '';
  roleAs: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private feathers: FeathersService,
    private localService: LocalService
  ) {
    // this.userSubject = new BehaviorSubject(
    //   JSON.parse(localStorage.getItem('user')!)
    // );
    // this.user = this.userSubject.asObservable();
    // this.currentUser$().subscribe((res) => {
    // this.user$ = this.userSubject.getValue();
    // console.log(this.user$);
    // });
  }

  public get userValue() {
    // return this.userSubject.value;
    return this.userSubject;
  }

  public currentUser() {
    return Promise.resolve(this.feathers.getCurrentUser());
    // return this.feathers.getCurrentUser();
  }

  public currentUser$(): Observable<any> {
    return from(Promise.resolve(this.feathers.getCurrentUser()));
    // return this.feathers.user().subscribe((res) => {
    //   this.user$ = res;
    // });
  }

  public logIn(credentials?: any): Promise<any> {
    return this.feathers.authenticate(credentials).then((res) => {
      this.userSubject = res.user;
      return res;
    });
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }

  isAuthenticated() {
    return this.feathers.isAuthenticated();
  }

  getRole() {
    this.roleAs = this.localService.getData('ROLE')!;
    return this.roleAs;
  }

  isToken(): boolean {
    return !!localStorage.getItem('auth-jwt');
    // return !!localStorage.getItem('auth-jwt') && !!localStorage.getItem('ID');
  }

  async isAuth(): Promise<boolean> {
    try {
      const auth = await this.logIn();
      if (!auth || !this.isToken()) {
        this.logOut();
        return false;
      }
      return true;
    } catch (error) {
      this.logOut();
      return false;
    }
  }

  async isLogin(): Promise<boolean> {
    try {
      const auth = await this.logIn();
      if (!auth) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    } catch (error) {
      return true;
    }
  }

  isLogged() {
    const isLogged = localStorage.getItem('auth-jwt') !== null;
    return isLogged;
  }

  getToken(): any {
    return window.localStorage.getItem('auth-jwt');
  }

  setToken(token: string): void {
    window.localStorage.setItem('auth-jwt', token);
  }

  getIdClient(): any {
    return window.localStorage.getItem('ID');
  }

  setIdClient(id: string): void {
    window.localStorage.setItem('ID', id);
  }

  async sendResetPwd(email: string): Promise<boolean> {
    try {
      let token = this.getToken();
      const options = {
        action: 'sendResetPwd',
        value: { email }, // {email}, {token: verifyToken}
        notifierOptions: {}, // options passed to options.notifier, e.g. {preferredComm: 'email'}
      };
      await this.feathers.service('authManagement').create(options);
      // this.notification.createNotificationSuccess();
      return true;
    } catch (error: any) {
      // this.notification.createNotificationError(error.message);
      return false;
    }
  }

  async resetPwdLong(token: any, password: string): Promise<boolean> {
    try {
      const options = {
        action: 'resetPwdLong',
        value: {
          token, // compares to .resetToken
          password, // new password
        },
      };
      await this.feathers.service('authManagement').create(options);
      // this.notification.createNotificationSuccess();
      return true;
    } catch (error: any) {
      // this.notification.createNotificationError(error.message);
      return false;
    }
  }

  async changePassword(
    _id: string,
    email: string,
    oldPassword: string,
    password: string
  ): Promise<boolean> {
    try {
      if (!email || !oldPassword || !password) {
        return false;
      }
      const options = {
        action: 'passwordChange',
        value: {
          user: { email, _id },
          oldPassword,
          password,
        },
      };
      await this.feathers.service('authManagement').create(options);
      // this.notification.createNotificationSuccess();
      return true;
    } catch (error: any) {
      // this.notification.createNotificationError(error.message);
      return false;
    }
  }

  /*verifyEmail(token: string) {
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
  }*/

  public logOut() {
    this.feathers.logout();
    this.roleAs = '';
    localStorage.clear();
    // this.userSubject.next(null);
    this.userSubject = null as any;
    this.router.navigate(['/accounts/login']);
  }

  getAuthToken(): string {
    return localStorage.getItem('access_token')!;
  }
}
