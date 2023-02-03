import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Trip } from '../../dashboard-trips/interfaces/trip';
import { Store } from '@ngrx/store';
import * as JourneyActions from '../../dashboard-trips/services/journey/journey.actions';
import * as TripActions from '../../dashboard-trips/services/trip.actions';
import {
  getJourney,
  State,
} from '../../dashboard-trips/services/journey/journey.reducer';

@Component({
  selector: 'tp-dashboard-trip-element',
  templateUrl: './dashboard-trip-element.component.html',
  styleUrls: ['./dashboard-trip-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTripElementComponent {
  _trip!: Trip;

  _journeyMode: boolean = false;
  selectedJourney$ = this.storeJourney.select(getJourney).pipe();

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

  constructor(private store: Store, private storeJourney: Store<State>) {}

  createJourney(tripId: number): void {
    this.store.dispatch(JourneyActions.journeyCreate({ tripId }));
  }

  stopJourney(journeyId: number | null): void {
    if (journeyId) {
      this.store.dispatch(JourneyActions.journeyStop({ journeyId }));
    }
  }

  updateFavorite(trip: Trip) {
    this.store.dispatch(TripActions.changeFavoriteStatus({ trip }));
  }
}
@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  transform(input: number) {
    return Math.floor(input);
  }
}
