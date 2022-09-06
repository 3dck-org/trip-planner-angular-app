import { createReducer, on } from '@ngrx/store';
import { Trip } from '../interfaces/trip';
import { tripListResponse } from './trip.actions';

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
  })
);

//@ts-ignore
export function tripReducer(state, action) {
  return _tripReducer(state, action);
}

// @ts-ignore
export const getTrips = (state: State) => state.trips.trips;
