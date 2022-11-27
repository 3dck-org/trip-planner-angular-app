import { createReducer, on } from '@ngrx/store';
import {
  journeyStopResponse,
  journeyCreateResponse,
  currentJourneyResponse,
} from './journey.actions';
import { Journey } from '../../interfaces/journey';

export interface State {
  journey: Journey;
}

export const initialState: State = {
  journey: {
    id: null,
    trip_id: null,
    user_id: null,
    completed: null,
    distance: null,
    start_at: null,
    end_at: null,
    created_at: null,
    updated_at: null,
  },
};

const _journeyReducer = createReducer(
  initialState,
  on(journeyCreateResponse, (state, { journey }) => {
    return {
      ...state,
      journey: journey,
    };
  }),
  on(journeyStopResponse, (state, { journey }) => {
    return {
      ...state,
      journey: initialState.journey,
    };
  }),
  on(currentJourneyResponse, (state, { journey }) => {
    return {
      ...state,
      journey: journey,
    };
  })
);

//@ts-ignore
export function journeyReducer(state, action) {
  return _journeyReducer(state, action);
}

// @ts-ignore
export const getJourney = (state: State): Journey => state.journey.journey;
