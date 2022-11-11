import { Component, Input } from '@angular/core';
import { Trip } from '../../dashboard-trips/interfaces/trip';
import { Store } from '@ngrx/store';
import * as JourneyActions from '../../dashboard-trips/services/journey/journey.actions';
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
    this.storeJourney.select(getJourney).subscribe((res) => {
      if (res) {
        this.selectedJourneySubject.next(res);
      }
    });
  }

  createJourney(tripId: number): void {
    this.store.dispatch(JourneyActions.journeyCreate({ tripId }));
  }
}
