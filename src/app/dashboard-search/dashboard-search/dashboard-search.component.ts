import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { TripSearchParams } from '../../core/interfaces/trip-search-params';
import { Trip } from '../../dashboard-trips/interfaces/trip';
import { Store } from '@ngrx/store';
import * as TripActions from '../../dashboard-trips/services/trip.actions';

@Component({
  selector: 'tp-dashboard-search',
  templateUrl: './dashboard-search.component.html',
  styleUrls: ['./dashboard-search.component.scss'],
})
export class DashboardSearchComponent {
  searchField;

  range = 1500;

  searchCoords = { x: 0, y: 0 };

  category_selected: string[] = [];

  constructor(readonly fb: FormBuilder, readonly tripStore: Store<Trip>) {
    this.searchField = fb.group({ searchParam: [''] });
    this.searchField.valueChanges.subscribe((res) => {
      if (res !== null) {
        this.searchCoords = { x: 0, y: 0 };
      }
    });
  }

  byLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.searchCoords = {
          x: position.coords.latitude,
          y: position.coords.longitude,
        };
      });
      this.searchField.controls['searchParam'].setValue(
        'Selected Your Location'
      );
    } else {
      console.log('No support for geolocation');
    }
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  search() {
    let string_categories = '';
    this.category_selected.forEach((cat) => {
      let strings = this.categoryIconBindingMap.get(cat);
      if (strings) string_categories = string_categories + strings.join(',');
    });

    let tripSearchParams: TripSearchParams = {
      city: null,
      radius: this.range.toString(),
      x: this.searchCoords.x.toString(),
      y: this.searchCoords.y.toString(),
      category_names: string_categories,
    };

    this.tripStore.dispatch(
      TripActions.filteredListRequest({ filterData: tripSearchParams })
    );
  }

  searchOptions: Options = {
    origin: {} as LatLng,
    strictBounds: false,
    bounds: {} as google.maps.LatLngBounds,
    componentRestrictions: { country: 'pl' },
    fields: ['geometry.location'],
    types: [],
  };

  handleAddressChange($event: Address) {
    this.searchCoords = {
      x: $event.geometry.location.lat(),
      y: $event.geometry.location.lng(),
    };
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
