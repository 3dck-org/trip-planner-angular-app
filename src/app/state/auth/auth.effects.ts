import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../../state/auth/auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService
          .login$(action.credentials.email, action.credentials.password)
          .pipe(
            map((loginSuccessResponse) =>
              AuthActions.loginSuccess({ loginSuccessResponse })
            ),
            catchError((error) => of(AuthActions.loginFailure({ error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ loginSuccessResponse }) => {
          localStorage.setItem(
            'access_token',
            loginSuccessResponse.access_token
          );
          localStorage.setItem(
            'refresh_token',
            loginSuccessResponse.refresh_token
          );
          localStorage.setItem('token_type', loginSuccessResponse.token_type);
          localStorage.setItem(
            'expires_in',
            new Date(
              new Date().getTime() + loginSuccessResponse.expires_in * 1000
            ).toISOString()
          );
          this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  registerRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerRequest),
      exhaustMap((action) =>
        this.authService
          .register$(
            action.credentials.email,
            action.credentials.password,
            action.credentials.name,
            action.credentials.surname,
            action.credentials.login
          )
          .pipe(
            map((registerSuccessResponse) =>
              AuthActions.registerSuccess({ registerSuccessResponse })
            ),
            catchError((error) => of(AuthActions.registerFailure({ error })))
          )
      )
    )
  );
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(({ registerSuccessResponse }) => {
          localStorage.setItem(
            'access_token',
            registerSuccessResponse.access_token
          );
          localStorage.setItem(
            'refresh_token',
            registerSuccessResponse.refresh_token
          );
          localStorage.setItem(
            'token_type',
            registerSuccessResponse.token_type
          );
          localStorage.setItem(
            'expires_in',
            new Date(
              new Date().getTime() + registerSuccessResponse.expires_in * 1000
            ).toISOString()
          );
          this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
