import { Point } from '../../dashboard-trips/interfaces/point';
import { TripPlaceInfo } from '../../dashboard-trips/interfaces/trip-place-info';

export interface RoadPart {
  mapMarker: MapMarker;
  startPoint: Point;
  endPoint: Point;
  tripPlaceInfo: TripPlaceInfo;
  order: number;
  status: string;
}

export interface MapMarker {}
