import { createReducer, on } from '@ngrx/store';
import { Trip } from '../interfaces/trip';
import { changeFavoriteStatusResponse, tripListResponse } from './trip.actions';
import { state } from '@angular/animations';

export interface State {
  trips: Array<Trip>;
}

export const initialState: State = {
  trips: [],
};

const _tripReducer = createReducer(
  initialState,
  on(tripListResponse, (state, { tripsList }) => {
    return {
      ...state,
      trips: tripsList,
    };
  }),
  on(changeFavoriteStatusResponse, (state, { trip }) => {
    return {
      ...state,
    };
  })
);

//@ts-ignore
export function tripReducer(state, action) {
  return _tripReducer(state, action);
}

// @ts-ignore
export const getTrips = (state: State) => state.trips.trips;
