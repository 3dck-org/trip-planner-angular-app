import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Place } from '../../dashboard-trips/interfaces/place';
import { FormBuilder, Validators } from '@angular/forms';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Address as TripAddress } from '../../dashboard-trips/interfaces/address';
import { Point } from '../../dashboard-trips/interfaces/point';
import { CreatorPlacesListService } from '../services/creator-places-list.service';
import { MapRouteLineService } from '../../dashboard/services/map-route-line.service';

@Component({
  selector: 'tp-roadmap-creator',
  templateUrl: './roadmap-creator.component.html',
  styleUrls: ['./roadmap-creator.component.scss'],
})
export class RoadmapCreatorComponent implements OnDestroy {
  places: Place[] = [];
  placeForm;

  category_selected: string[] = [];

  selectedPlace: Place | undefined = undefined;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.places, event.previousIndex, event.currentIndex);
    this.creatorPlacesListService.places = this.places;
  }

  ngOnDestroy() {
    this.creatorPlacesListService.clear();
  }

  constructor(
    readonly fb: FormBuilder,
    readonly creatorPlacesListService: CreatorPlacesListService,
    readonly mapRouteLineService: MapRouteLineService,
    private cdr: ChangeDetectorRef
  ) {
    this.placeForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      point_x: [''],
      point_y: [''],
      created_at: [''],
      updated_at: [''],
      street: [''],
      buildingNumber: [''],
      apartment: [''],
      city: [''],
      google_maps_url: [''],
    });
  }

  addEditPlace() {
    let place: Place = {} as Place;
    let point: Point = {} as Point;
    let tripAddress: TripAddress = {} as TripAddress;

    let name = this.placeForm.get('name')?.value;
    let description = this.placeForm.get('description')?.value;
    let address = this.placeForm.get('address')?.value;
    let point_x = this.placeForm.get('point_x')?.value;
    let point_y = this.placeForm.get('point_y')?.value;
    let city = this.placeForm.get('city')?.value;
    let google_maps_url = this.placeForm.get('google_maps_url')?.value;
    place.name = name ? name : '';
    place.description = description ? description : '';
    point.x = parseFloat(point_x ? point_x : '');
    point.y = parseFloat(point_y ? point_y : '');
    place.point = point;
    tripAddress.street = address ? address : '';
    tripAddress.city = city ? city : '';
    place.address = tripAddress;
    place.google_maps_url = google_maps_url ? google_maps_url : '';
    place.category_dictionaries = this.category_selected.map((cat) => {
      return {
        name: cat,
        id: 1,
      };
    });
    if (this.selectedPlace) {
      let number = this.places.indexOf(this.selectedPlace);
      this.places[number] = place;
    } else {
      this.places.push(place);
    }
    this.category_selected = [];
    this.selectedPlace = undefined;
    this.creatorPlacesListService.places = this.places;
    this.placeForm.reset();
  }

  searchOptions: Options = {
    origin: {} as LatLng,
    strictBounds: false,
    bounds: {} as google.maps.LatLngBounds,
    componentRestrictions: { country: 'pl' },
    fields: [
      'geometry.location',
      'formatted_address',
      'url',
      'address_components',
    ],
    types: [],
  };

  handleAddressChange($event: Address) {
    this.placeForm.controls['point_x'].setValue(
      $event.geometry.location.lat() + ''
    );
    this.placeForm.controls['point_y'].setValue(
      $event.geometry.location.lng() + ''
    );

    let addressComponent = $event.address_components.filter((ac) => {
      return ac.types.indexOf('locality') > -1;
    });

    if (addressComponent[0]) {
      this.placeForm.controls['city'].setValue(addressComponent[0].long_name);
    }
    this.placeForm.controls['address'].setValue($event.formatted_address);
    this.placeForm.controls['google_maps_url'].setValue($event.url);
  }

  deletePlace(index: number) {
    this.places.splice(index, 1);
    this.creatorPlacesListService.places = this.places;
  }

  editPlace(ind: number) {
    let place = this.places[ind];
    if (place) {
      this.selectedPlace = place;
      this.placeForm.reset();
      this.placeForm.controls['name'].setValue(place.name);
      this.placeForm.controls['description'].setValue(place.description);
      this.placeForm.controls['address'].setValue(place.address.street);
      this.placeForm.controls['point_x'].setValue(place.point.x + '');
      this.placeForm.controls['point_y'].setValue(place.point.y + '');
      this.placeForm.controls['google_maps_url'].setValue(
        place.google_maps_url
      );
      this.placeForm.controls['city'].setValue(place.address.city);
      this.category_selected = place.category_dictionaries.map(
        (cat) => cat.name
      );
    }
  }
}
