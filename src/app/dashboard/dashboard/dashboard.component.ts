import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TripActions from '../../dashboard-trips/services/trip.actions';
import * as JourneyActions from '../../dashboard-trips/services/journey/journey.actions';

@Component({
  selector: 'tp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    this.store.dispatch(TripActions.tripsListRequest());
    this.store.dispatch(JourneyActions.currentJourney());
  }
}
