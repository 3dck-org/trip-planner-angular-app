import { TripPlaceInfo } from './trip-place-info';

export interface Trip {
  id: number;
  user_id: string;
  name: string;
  description: string;
  distance: string;
  duration: number;
  created_at: Date;
  updated_at: Date;
  image_url: string;
  trip_place_infos: TripPlaceInfo[];
}
