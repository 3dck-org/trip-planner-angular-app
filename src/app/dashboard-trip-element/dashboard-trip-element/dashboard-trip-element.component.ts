import { Component, Input } from '@angular/core';
import { Trip } from '../../dashboard-trips/interfaces/trip';
import { select, Store } from '@ngrx/store';
import * as JourneyActions from '../../dashboard-trips/services/journey/journey.actions';
import * as TripActions from '../../dashboard-trips/services/trip.actions';
import {
  getJourney,
  State,
} from '../../dashboard-trips/services/journey/journey.reducer';
import { BehaviorSubject } from 'rxjs';
import { Journey } from '../../dashboard-trips/interfaces/journey';

@Component({
  selector: 'tp-dashboard-trip-element',
  templateUrl: './dashboard-trip-element.component.html',
  styleUrls: ['./dashboard-trip-element.component.scss'],
})
export class DashboardTripElementComponent {
  @Input()
  trip!: Trip;
  selectedJourneySubject = new BehaviorSubject<Journey | null>(null);
  selectedJourney$ = this.selectedJourneySubject.asObservable();

  constructor(private store: Store, private storeJourney: Store<State>) {
    this.storeJourney.pipe(select(getJourney)).subscribe((res) => {
      if (res) {
        this.selectedJourneySubject.next(res);
      }
    });
  }

  createJourney(tripId: number): void {
    this.store.dispatch(JourneyActions.journeyCreate({ tripId }));
  }

  stopJourney(): void {
    let journeyId = this.selectedJourneySubject.getValue()?.id;
    if (journeyId) {
      this.store.dispatch(JourneyActions.journeyStop({ journeyId }));
    }
  }

  updateFavorite(trip: Trip) {
    this.store.dispatch(TripActions.changeFavoriteStatus({ trip }));
  }
}
