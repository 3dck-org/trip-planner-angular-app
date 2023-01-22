import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import {
  getJourney,
  State,
} from '../../dashboard-trips/services/journey/journey.reducer';
import * as JourneyActions from '../../dashboard-trips/services/journey/journey.actions';
import { TripPlaceInfo } from '../../dashboard-trips/interfaces/trip-place-info';
import { SelectedPlaceInfoService } from '../services/selected-place-info.service';

@Component({
  selector: 'tp-journey-roadmap',
  templateUrl: './journey-roadmap.component.html',
  styleUrls: ['./journey-roadmap.component.scss'],
})
export class JourneyRoadmapComponent implements AfterViewInit {
  @ViewChild(MatStepper) stepper!: MatStepper;

  journey$ = this.journeyStore.select(getJourney).pipe();

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }

  constructor(
    readonly journeyStore: Store<State>,
    readonly selectedPlaceInfoService: SelectedPlaceInfoService
  ) {}

  updateSelectedPlace(placeInfo: TripPlaceInfo) {
    this.selectedPlaceInfoService.selectedPlaceInfo = placeInfo;
  }
}
