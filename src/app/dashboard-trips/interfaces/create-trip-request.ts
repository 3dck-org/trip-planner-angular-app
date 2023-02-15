import { Place } from './place';
import { CreateTripPlaceDto } from './create-trip-place-dto';

export interface CreateTripRequest {
  name: string;
  description: string;
  distance: string;
  duration: string;
  image_url: string;
  places: CreateTripPlaceDto[];
}
