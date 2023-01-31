import { createReducer, on } from '@ngrx/store';
import {
  journeyStopResponse,
  journeyCreateResponse,
  currentJourneyResponse,
} from './journey.actions';
import { Journey } from '../../interfaces/journey';
import { RoadPart } from '../../../core/interfaces/road-part';

export interface State {
  journey: Journey;
}

export const initialState: State = {
  journey: {
    id: null,
    trip: null,
    user: null,
    completed: null,
    distance: null,
    start_at: null,
    end_at: null,
    created_at: null,
    updated_at: null,
    journey_place_infos: [],
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
  on(journeyStopResponse, (state, {}) => {
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

export const getRoadParts = (state: State): RoadPart[] => {
  const roadParts: RoadPart[] = [];
  // @ts-ignore
  let journey: Journey = state.journey.journey;
  if (!journey || !journey.trip) return [];
  let tripPlaceInfos = journey.trip?.trip_place_infos;
  if (tripPlaceInfos) {
    for (
      let first = 0, second = 1;
      first < tripPlaceInfos.length;
      first++, second++
    ) {
      if (second == tripPlaceInfos.length) {
        let firstPlaceInfo = tripPlaceInfos[first];
        let roadPart = {
          tripPlaceInfo: firstPlaceInfo,
          startPoint: firstPlaceInfo.place.point,
          endPoint: {},
          status: journey.journey_place_infos.find(
            (jour) => jour.place_id === firstPlaceInfo.place_id
          )?.status,
          order: tripPlaceInfos[first].order,
          mapMarker: {},
        } as RoadPart;
        roadParts.push(roadPart);
      } else {
        let firstPlaceInfo = tripPlaceInfos[first];
        let secondPlaceInfo = tripPlaceInfos[second];
        let roadPart = {
          tripPlaceInfo: firstPlaceInfo,
          startPoint: firstPlaceInfo.place.point,
          endPoint: secondPlaceInfo.place.point,
          status: journey.journey_place_infos.find(
            (jour) => jour.place_id === firstPlaceInfo.place_id
          )?.status,
          order: tripPlaceInfos[first].order,
          mapMarker: {},
        } as RoadPart;
        roadParts.push(roadPart);
      }
    }
  }
  return roadParts;
};
