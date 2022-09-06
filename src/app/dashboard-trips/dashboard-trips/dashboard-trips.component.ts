import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Trip } from '../interfaces/trip';
import { BehaviorSubject, Observable } from 'rxjs';
import { getTrips, State } from '../services/trip.reducer';

@Component({
  selector: 'tp-dashboard-trips',
  templateUrl: './dashboard-trips.component.html',
  styleUrls: ['./dashboard-trips.component.scss'],
})
export class DashboardTripsComponent implements OnInit {
  tripsSubject = new BehaviorSubject<Trip[]>([]);

  trips$: Observable<Array<Trip>> = this.tripsSubject.asObservable();

  constructor(private store: Store<State>) {
    this.store.select(getTrips).subscribe((res) => {
      if (res) {
        this.tripsSubject.next(res);
      }
    });
  }

  ngOnInit(): void {}
}
