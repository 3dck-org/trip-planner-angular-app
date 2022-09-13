import { createAction, props } from '@ngrx/store';
import { AuthResponse } from '../interfaces/response/auth-response';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginSuccessResponse: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const registerRequest = createAction(
  '[Auth] Register Request',
  props<{
    credentials: {
      email: string;
      password: string;
      name: string;
      surname: string;
      login: string;
    };
  }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ registerSuccessResponse: AuthResponse }>()
);

export const registerFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
