import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loginSuccess, loginFailure } from './auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType('[Login] User Login'),
  //     switchMap(({ credentials }) =>
  //       this.authService.logIn(credentials).then(
  //         map((token) => loginSuccess({ token })),
  //         catchError((error) => of(loginFailure({ error })))
  //       )
  //     )
  //   )
  // );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
