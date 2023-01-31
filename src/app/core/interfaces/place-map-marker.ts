import { TripPlaceInfo } from '../../dashboard-trips/interfaces/trip-place-info';

export interface PlaceMapMarker {
  position: google.maps.LatLngLiteral;
  label: string;
  options: google.maps.MarkerOptions;
  tripPlaceInfo: TripPlaceInfo;
}
