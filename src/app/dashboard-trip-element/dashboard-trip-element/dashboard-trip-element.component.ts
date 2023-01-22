import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTripElementComponent {
  _trip!: Trip;

  _journeyMode: boolean = false;
  selectedJourneySubject = new BehaviorSubject<Journey | null>(null);
  selectedJourney$ = this.selectedJourneySubject.asObservable();

  @Input()
  set trip(trip: Trip | undefined | null) {
    if (trip) {
      this._trip = trip;
    }
  }

  @Input()
  set journeyMode(val: boolean) {
    this._journeyMode = val;
  }

  constructor(private store: Store, private storeJourney: Store<State>) {
    this.storeJourney.pipe(select(getJourney)).subscribe((res) => {
      if (res) {
        this.selectedJourneySubject.next(res);
      }
    });
  }

  createJourney(tripId: number): void {
    this.store.dispatch(JourneyActions.journeyCreate({ tripId }));
    this.store.dispatch(JourneyActions.currentJourney());
  }

  stopJourney(): void {
    let journeyId = this.selectedJourneySubject.getValue()?.id;
    if (journeyId) {
      this.store.dispatch(JourneyActions.journeyStop({ journeyId }));
      this.store.dispatch(JourneyActions.currentJourney());
    }
  }

  updateFavorite(trip: Trip) {
    this.store.dispatch(TripActions.changeFavoriteStatus({ trip }));
  }
}
