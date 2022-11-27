import { Component } from '@angular/core';
import { getProfile, State as ProfileState } from '../reducers/profile.reducer';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../interfaces/profile';
import * as ProfileActions from '../actions/profile.actions';
import * as TripActions from '../../dashboard-trips/services/trip.actions';
import {
  getTrips,
  State as TripState,
} from '../../dashboard-trips/services/trip.reducer';
import { Trip } from '../../dashboard-trips/interfaces/trip';

@Component({
  selector: 'tp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$ = this.profileSubject.asObservable();

  favoriteTripsSubject = new BehaviorSubject<Trip[]>([]);
  favoriteTrips$ = this.favoriteTripsSubject.asObservable();

  constructor(
    private storeProfile: Store<ProfileState>,
    private storeTrip: Store<TripState>
  ) {
    this.storeProfile.dispatch(ProfileActions.getProfile());
    this.storeProfile.pipe(select(getProfile)).subscribe((res) => {
      if (res) {
        this.profileSubject.next(res);
      }
    });
    this.storeProfile.dispatch(TripActions.tripsListRequest());
    this.storeTrip.pipe(select(getTrips)).subscribe((res) => {
      if (res) {
        this.favoriteTripsSubject.next(res);
      }
    });
  }

  profileImage(): string {
    let profileImage = this.profileSubject.getValue()?.image_url;
    return profileImage ? profileImage : '';
  }
}
