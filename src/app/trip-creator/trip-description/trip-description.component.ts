import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../dashboard-trips/interfaces/trip';

@Component({
  selector: 'tp-trip-description',
  templateUrl: './trip-description.component.html',
  styleUrls: ['./trip-description.component.scss'],
})
export class TripDescriptionComponent implements OnInit {
  _trip!: Trip;

  @Input()
  set trip(trip: Trip) {
    this._trip = trip;
  }

  constructor() {}

  ngOnInit(): void {}
}
