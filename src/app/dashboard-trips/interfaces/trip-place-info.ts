import { Place } from './place';

export interface TripPlaceInfo {
  place_id: number;
  trip_id: number;
  comment: string;
  order: number;
  place: Place;
}
