import { createReducer, on } from '@ngrx/store';
import { getProfileResponse } from '../actions/profile.actions';
import { Profile } from '../interfaces/profile';

export interface State {
  profile: Profile;
}

export const initialState: State = {
  profile: {
    id: null,
    birthday: null,
    email: null,
    image_url: null,
    name: null,
    role_id: null,
    surname: null,
    login: null,
    created_at: null,
    updated_at: null,
  },
};

const _profileReducer = createReducer(
  initialState,
  on(getProfileResponse, (state, { profile }) => {
    return {
      ...state,
      profile: profile,
    };
  })
);

//@ts-ignore
export function profileReducer(state, action) {
  return _profileReducer(state, action);
}

// @ts-ignore
export const getProfile = (state: State): Profile => state.profile.profile;
