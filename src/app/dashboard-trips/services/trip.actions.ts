import { createAction, props } from '@ngrx/store';
import { Trip } from '../interfaces/trip';
import { TripSearchParams } from '../../core/interfaces/trip-search-params';
import { CreateTripRequest } from '../interfaces/create-trip-request';

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

export const filteredListRequest = createAction(
  '[Trip] Filtered List Request',
  props<{ filterData: TripSearchParams }>()
);

export const createTrip = createAction(
  '[Trip] Create Trip ',
  props<{ trip: CreateTripRequest }>()
);

export const deleteTrip = createAction(
  '[Trip] Delete Trip',
  props<{ tripId: number }>()
);

export const noneRespValue = createAction('[Trip] None Val resp');
