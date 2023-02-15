import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Trip } from '../../dashboard-trips/interfaces/trip';
import { FormBuilder, Validators } from '@angular/forms';
import { CreatorPlacesListService } from '../services/creator-places-list.service';
import { CreateTripRequest } from '../../dashboard-trips/interfaces/create-trip-request';
import { CreateTripPlaceDto } from '../../dashboard-trips/interfaces/create-trip-place-dto';
import * as TripActions from '../../dashboard-trips/services/trip.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SnackBarService } from '../../core/services/snack-bar.service';

@Component({
  selector: 'tp-trip-description',
  templateUrl: './trip-description.component.html',
  styleUrls: ['./trip-description.component.scss'],
})
export class TripDescriptionComponent {
  _trip!: Trip;

  imageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

  @Input()
  set trip(trip: Trip) {
    this._trip = trip;
  }

  tripDescription;

  constructor(
    readonly fb: FormBuilder,
    readonly changeDetect: ChangeDetectorRef,
    readonly creatorPlacesListService: CreatorPlacesListService,
    readonly tripStore: Store<Trip>,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.tripDescription = fb.group({
      imageTripUrl: [''],
      tripName: ['', Validators.required],
      description: ['', Validators.required],
      distance: ['', Validators.min(0)],
      duration: ['', Validators.min(0)],
    });
    this.tripDescription.valueChanges.subscribe((res) => {
      if (res.imageTripUrl) {
        this.imageUrl = res.imageTripUrl;
      }
    });
  }

  addTrip() {
    let places = this.creatorPlacesListService.places;
    let createTripRequest: CreateTripRequest = {} as CreateTripRequest;

    let createTripPlaceDtoList: CreateTripPlaceDto[] = places.map((res) => {
      let string_categories: string[] = [];
      res.category_dictionaries.forEach((cat) => {
        let strings = this.categoryIconBindingMap.get(cat.name);
        if (strings) string_categories = string_categories.concat(strings);
      });
      return {
        name: res.name,
        description: res.description,
        street: res.address.street,
        city: res.address.city,
        google_maps_url: res.google_maps_url,
        point: res.point.x + ',' + res.point.y,
        category_names: string_categories,
      };
    });
    let name = this.tripDescription.controls['tripName'].value;
    let imageTripUrl = this.tripDescription.controls['imageTripUrl'].value;
    let description = this.tripDescription.controls['description'].value;
    let distance = this.tripDescription.controls['distance'].value;
    let duration = this.tripDescription.controls['duration'].value;
    createTripRequest.name = name ? name : '';
    createTripRequest.image_url = imageTripUrl ? imageTripUrl : '';
    createTripRequest.description = description ? description : '';
    createTripRequest.distance = distance ? distance : '';
    createTripRequest.duration = duration
      ? (parseInt(duration) * 60).toString()
      : '';
    createTripRequest.places = createTripPlaceDtoList;
    this.tripStore.dispatch(
      TripActions.createTrip({ trip: createTripRequest })
    );
    this.router.navigate(['/']);
    this.snackBarService.createSnack('Trip Successfully Created!');
    this.creatorPlacesListService.clear();
  }

  categoryIconBindingMap: Map<string, string[]> = new Map([
    [
      'restaurant',
      [
        'food',
        'meal_takeaway',
        'meal_delivery',
        'cafe',
        'bar',
        'bakery',
        'restaurant',
      ],
    ],
    ['local_hospital', ['spa', 'gym', 'beauty_salon']],
    [
      'fort',
      [
        'zoo',
        'tourist_attraction',
        'stadium',
        'rv_park',
        'library',
        'city_hall',
        'church',
        'cemetery',
        'campground',
        'bowling_alley',
        'aquarium',
        'amusement_park',
        'museum',
        'art_gallery',
      ],
    ],
    [
      'local_grocery_store',
      [
        'shoe_store',
        'store',
        'liquor_store',
        'jewelry_store',
        'hardware_store',
        'furniture_store',
        'electronics_store',
        'department_store',
        'convenience_store',
        'book_store',
      ],
    ],
    ['nightlife', ['night_club', 'casino']],
  ]);
}
