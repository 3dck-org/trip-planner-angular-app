import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  get routeLine(): google.maps.DirectionsResult[] {
    return this._routeLine.value;
  }
}
