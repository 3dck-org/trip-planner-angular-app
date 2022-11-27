import { createAction, props } from '@ngrx/store';
import { Profile } from '../interfaces/profile';

export const getProfile = createAction('[Profile] Get');

export const getProfileResponse = createAction(
  '[Profile] Get Response',
  props<{ profile: Profile }>()
);
export const error = createAction(
  '[Profile] Error',
  props<{ error: string }>()
);
