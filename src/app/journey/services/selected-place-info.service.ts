import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TripPlaceInfo } from '../../dashboard-trips/interfaces/trip-place-info';

@Injectable({
  providedIn: 'root',
})
export class SelectedPlaceInfoService {
  private _selectedPlaceInfo = new BehaviorSubject<TripPlaceInfo>(
    {} as TripPlaceInfo
  );

  set selectedPlaceInfo(val: TripPlaceInfo) {
    this._selectedPlaceInfo.next(val);
  }

  get selectedPlaceInfo() {
    return this._selectedPlaceInfo.value;
  }

  constructor() {}
}
