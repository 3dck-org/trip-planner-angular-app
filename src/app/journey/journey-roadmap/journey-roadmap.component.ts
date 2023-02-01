import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import {
  getJourney,
  State,
} from '../../dashboard-trips/services/journey/journey.reducer';
import { TripPlaceInfo } from '../../dashboard-trips/interfaces/trip-place-info';
import { SelectedPlaceInfoService } from '../services/selected-place-info.service';
import { Journey } from '../../dashboard-trips/interfaces/journey';
import * as JourneyActions from '../../dashboard-trips/services/journey/journey.actions';

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

  placeStatus(journey: Journey | null, placeId: number): string {
    if (journey !== null) {
      let journeyPlaceInfo = journey.journey_place_infos.find(
        (jourPlace) => jourPlace.place_id === placeId
      );
      if (journeyPlaceInfo) return journeyPlaceInfo.status;
    }

    return 'completed';
  }

  updateStartStatus(journey: Journey, placeInfo: TripPlaceInfo) {
    this.journeyStore.dispatch(
      JourneyActions.updatePlaceStatus({
        journeyId: journey.id !== null ? journey.id : -1,
        placeId: placeInfo.place_id,
        status: 'active',
      })
    );
    journey.journey_place_infos
      .filter((value) => value.status === 'active')
      .forEach((val) => {
        this.journeyStore.dispatch(
          JourneyActions.updatePlaceStatus({
            journeyId: journey.id !== null ? journey.id : -1,
            placeId: val.place_id !== null ? val.place_id : -1,
            status: 'visited',
          })
        );
      });
  }
}
