import { createAction, props } from '@ngrx/store';
import { Trip } from '../interfaces/trip';

export const tripsListRequest = createAction('[Trip] List Request');

export const tripListResponse = createAction(
  '[Trip] List Response',
  props<{ tripsList: Trip[] }>()
);

export const error = createAction(
  '[Trip] List Failure',
  props<{ error: string }>()
);
