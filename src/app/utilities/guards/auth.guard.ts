import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  // result = new Subject<boolean>();
  result: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastService: MessageService
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;

    /* Try to auth with the server. If authed resolve to true, else resolve to false */
    return this.auth
      .logIn()
      .then(
        () => true
        // () => this.checkUserLogin(route, url)
      )
      .catch(() => {
        this.toastService.add({
          severity: 'error',
          summary: 'Access denied',
          detail: 'Please login to continue access',
        });
        this.router.navigate(['/accounts/login']);
        return false;
      });
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.auth.isLoggedIn()) {
      const userRole = this.auth.getRole();
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}

/*
let url: string = state.url;

    if (this.auth.isAuthenticated()) {
      const userRole = this.auth.getRole();

      if (
        route.data['role'] &&
        route.data['role'].indexOf(userRole) === -1 &&
        this.auth.isAuthenticated()
      ) {
        this.router.navigate(['/']);
        return true;
      }

      return true;
    }

    this.router.navigate(['accounts/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
    */
