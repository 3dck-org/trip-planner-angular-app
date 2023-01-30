import { Component, OnInit } from '@angular/core';
import { Trip } from '../../dashboard-trips/interfaces/trip';

@Component({
  selector: 'tp-trip-creator',
  templateUrl: './trip-creator.component.html',
  styleUrls: ['./trip-creator.component.scss'],
})
export class TripCreatorComponent implements OnInit {
  trip!: Trip;

  constructor() {}

  ngOnInit(): void {}
}
