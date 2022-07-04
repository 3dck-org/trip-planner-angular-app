import {ActionCreator, ActionReducer, createReducer, on} from "@ngrx/store";
import {loginFailure, loginSuccess, registerFailure, registerSuccess} from "./auth.actions";


export interface State {
  loginError: string | null;
  access_token: string | null;
  token_type: string | null;
  expires_in: number | null;
  refresh_token: string | null;
  created_at: number | null;
}

export const initialState: State = {
  loginError: null,
  access_token: null,
  token_type: null,
  expires_in: null,
  refresh_token: null,
  created_at: null,
}

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, {loginSuccessResponse}) => {
    return {
      ...state,
      access_token: loginSuccessResponse.access_token,
      token_type: loginSuccessResponse.token_type,
      expires_in: loginSuccessResponse.expires_in,
      refresh_token: loginSuccessResponse.refresh_token,
      created_at: loginSuccessResponse.created_at,
    };
  }),
  on(loginFailure, (state, {error}) => {
    return {
      ...state,
      loginError: error,
      access_token: null,
      token_type: null,
      expires_in: null,
      refresh_token: null,
      created_at: null,
    };
  }),
  on(registerSuccess,(state, {registerSuccessResponse}) => {
    return {
      ...state,
      access_token: registerSuccessResponse.access_token,
      token_type: registerSuccessResponse.token_type,
      expires_in: registerSuccessResponse.expires_in,
      refresh_token: registerSuccessResponse.refresh_token,
      created_at: registerSuccessResponse.created_at,
    };
  }),
  on(registerFailure, (state, {error}) => {
    return {
      ...state,
      loginError: error,
      access_token: null,
      token_type: null,
      expires_in: null,
      refresh_token: null,
      created_at: null,
    };
  }),
);

//@ts-ignore
export function authReducer(state, action) {
  return _authReducer(state, action);
}
