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

export const changeFavoriteStatus = createAction(
  '[Trip] Update Favorite Status',
  props<{ trip: Trip }>()
);

export const changeFavoriteStatusResponse = createAction(
  '[Trip] Update Favorite Status Response',
  props<{ trip: Trip }>()
);
