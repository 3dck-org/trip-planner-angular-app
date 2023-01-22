import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../dashboard-trips/interfaces/place';

@Component({
  selector: 'tp-roadmap-place-description',
  templateUrl: './roadmap-place-description.component.html',
  styleUrls: ['./roadmap-place-description.component.scss'],
})
export class RoadmapPlaceDescriptionComponent implements OnInit {
  _place!: Place;

  @Input()
  set place(place: Place | undefined | null) {
    if (place) {
      this._place = place;
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
