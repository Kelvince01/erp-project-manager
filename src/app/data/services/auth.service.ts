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
