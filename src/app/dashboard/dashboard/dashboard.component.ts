import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TripActions from '../../dashboard-trips/services/trip.actions';
import * as JourneyActions from '../../dashboard-trips/services/journey/journey.actions';
import {
  getJourney,
  State as JourneyState,
} from '../../dashboard-trips/services/journey/journey.reducer';
import { tap } from 'rxjs';

@Component({
  selector: 'tp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  journey$ = this.journeyStore.select(getJourney).pipe();

  constructor(
    private store: Store,
    private journeyStore: Store<JourneyState>
  ) {}

  ngAfterViewInit(): void {
    this.store.dispatch(TripActions.tripsListRequest());
    this.store.dispatch(JourneyActions.currentJourney());
  }
}
