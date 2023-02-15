import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaceMapMarker } from '../../core/interfaces/place-map-marker';

@Injectable({
  providedIn: 'root',
})
export class MapRouteLineService {
  private _routeLine = new BehaviorSubject<google.maps.DirectionsResult[]>([]);
  routeLine$ = this._routeLine.asObservable();

  constructor() {}

  set routeLine(arr: google.maps.DirectionsResult[]) {
    this._routeLine.next(arr);
  }

  clear() {
    this._routeLine.next([]);
    this._mapMarkers.next([]);
  }

  get routeLine(): google.maps.DirectionsResult[] {
    return this._routeLine.value;
  }
  private _mapMarkers = new BehaviorSubject<PlaceMapMarker[]>([]);

  set mapMarkers(arr: PlaceMapMarker[]) {
    this._mapMarkers.next(arr);
  }
  mapMarkers$ = this._mapMarkers.asObservable();
  get mapMarkers() {
    return this._mapMarkers.value;
  }
}
