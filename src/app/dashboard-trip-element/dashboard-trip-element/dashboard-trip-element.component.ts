import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../dashboard-trips/interfaces/trip';

@Component({
  selector: 'tp-dashboard-trip-element',
  templateUrl: './dashboard-trip-element.component.html',
  styleUrls: ['./dashboard-trip-element.component.scss'],
})
export class DashboardTripElementComponent implements OnInit {
  @Input()
  trip!: Trip;
  constructor() {}

  ngOnInit(): void {}
}
