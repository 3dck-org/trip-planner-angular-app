import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Place } from '../../dashboard-trips/interfaces/place';
import { PlaceMapMarker } from '../../core/interfaces/place-map-marker';

@Injectable({
  providedIn: 'root',
})
export class CreatorPlacesListService {
  constructor() {}

  private _placesSubject = new BehaviorSubject<Place[]>([]);

  set places(places: Place[]) {
    this.clear();
    this._placesSubject.next(places);
  }

  get places() {
    return this._placesSubject.value;
  }

  $places = this._placesSubject.asObservable();

  clear() {
    this.markers = [];
    this.routeLine = [];
    this._placesSubject.next([]);
  }

  private _routeLine = new BehaviorSubject<google.maps.DirectionsResult[]>([]);
  routeLine$ = this._routeLine.asObservable();

  set routeLine(arr: google.maps.DirectionsResult[]) {
    this._routeLine.next(arr);
  }

  get routeLine(): google.maps.DirectionsResult[] {
    return this._routeLine.value;
  }

  readonly _markersSubject = new BehaviorSubject<PlaceMapMarker[]>([]);

  set markers(markers: PlaceMapMarker[]) {
    this._markersSubject.next(markers);
  }

  get markers() {
    return this._markersSubject.value;
  }

  markers$ = this._markersSubject.asObservable();
}
