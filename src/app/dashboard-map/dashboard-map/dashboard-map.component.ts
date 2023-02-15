import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  getRoadParts,
  State,
} from '../../dashboard-trips/services/journey/journey.reducer';
import { Store } from '@ngrx/store';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
import { RoadPart } from '../../core/interfaces/road-part';
import { SelectedPlaceInfoService } from '../../journey/services/selected-place-info.service';
import { PlaceMapMarker } from '../../core/interfaces/place-map-marker';
import { MapRouteLineService } from '../../dashboard/services/map-route-line.service';
import { Place } from '../../dashboard-trips/interfaces/place';
import TravelMode = google.maps.TravelMode;
import { CreatorPlacesListService } from '../../trip-creator/services/creator-places-list.service';
import { TripPlaceInfo } from '../../dashboard-trips/interfaces/trip-place-info';
import { Router } from '@angular/router';

@Component({
  selector: 'tp-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMapComponent implements OnDestroy {
  zoom = 15;

  public onMapReady(map: google.maps.Map): void {
    map.panTo(this.center);
    this.changeZoom(15);
  }

  public center: google.maps.LatLng = new google.maps.LatLng({
    lat: 52.237049,
    lng: 21.017532,
  });
  prevResRoadPars: RoadPart[] = [];
  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  generateMapMarkers(roadParts: RoadPart[]) {
    if (!roadParts || roadParts.length <= 1) {
      this.mapRouteLineService.mapMarkers = [];
      return;
    }

    this.mapRouteLineService.mapMarkers = roadParts.map((roadPart) => {
      let marker: PlaceMapMarker = {
        label: roadPart.tripPlaceInfo.place.name,
        options: this.mapMarkerView(roadPart),
        position: {
          lat: roadPart.startPoint.x,
          lng: roadPart.startPoint.y,
        },
        tripPlaceInfo: roadPart.tripPlaceInfo,
      };
      return marker;
    });
  }

  constructor(
    readonly store: Store<State>,
    readonly selectedPlaceInfoService: SelectedPlaceInfoService,
    readonly mapDirectionsService: MapDirectionsService,
    readonly mapRouteLineService: MapRouteLineService,
    readonly creatorPlaceListService: CreatorPlacesListService,
    readonly router: Router
  ) {
    this.store.select(getRoadParts).subscribe((res) => {
      if (
        JSON.stringify(res) !== JSON.stringify(this.prevResRoadPars) &&
        router.url !== '/create-trip'
      ) {
        this.prevResRoadPars = res;
        this.direction(res);
        this.generateMapMarkers(res);
      }
    });

    this.creatorPlaceListService.$places.subscribe((res) => {
      this.createTripLine(res);
      this.generateCreatorMapMarkers(res);
    });
  }

  changeZoom(val: number) {
    this.zoom = val;
  }

  changeCenter(position: google.maps.LatLng) {
    if (this.center != position) this.center = position;
  }
  ngOnDestroy() {
    this.creatorPlaceListService.clear();
    this.mapRouteLineService.clear();
  }

  direction(roadPart: RoadPart[]) {
    if (!roadPart || roadPart.length <= 1) {
      this.mapRouteLineService.routeLine = [];
      return;
    }

    this.changeCenter(
      new google.maps.LatLng({
        lat: roadPart[0].startPoint.x,
        lng: roadPart[0].startPoint.y,
      })
    );

    let wayPoints: google.maps.DirectionsWaypoint[] = [];
    for (let i = 1; i < roadPart.length - 1; i++) {
      wayPoints.push({
        location: new google.maps.LatLng({
          lat: roadPart[i].startPoint.x,
          lng: roadPart[i].startPoint.y,
        }),
        stopover: true,
      } as google.maps.DirectionsWaypoint);
    }

    this.mapDirectionsService
      .route({
        origin: {
          lat: roadPart[0].startPoint.x,
          lng: roadPart[0].startPoint.y,
        },
        travelMode: TravelMode.WALKING,
        destination: {
          lat: roadPart[roadPart.length - 1].startPoint.x,
          lng: roadPart[roadPart.length - 1].startPoint.y,
        },
        provideRouteAlternatives: false,
        waypoints: wayPoints,
      })
      .subscribe((res) => {
        if (res.result) {
          if (
            JSON.stringify(res.result) !==
            JSON.stringify(this.mapRouteLineService.routeLine[0])
          ) {
            this.mapRouteLineService.routeLine = [];
            this.mapRouteLineService.routeLine = [res.result];
          }
        }
      });
  }

  markerRoadMapStatus = new Map<string, string>([
    ['active', 'red'],
    ['inactive', 'blue'],
    ['visited', 'grey'],
  ]);

  mapMarkerView(roadPart: RoadPart): google.maps.MarkerOptions {
    return {
      title: roadPart.tripPlaceInfo.place.name,
      icon: {
        url: `https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_${this.markerRoadMapStatus.get(
          roadPart.status
        )}${roadPart.order}.png`,
      },
    };
  }

  mapMarkerCreatorView(place: Place): google.maps.MarkerOptions {
    return {
      title: place.name,
      icon: {
        url: `https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png`,
      },
    };
  }
  directionsOptions(): google.maps.DirectionsRendererOptions {
    return {
      markerOptions: { visible: false },
    };
  }

  createTripLine(places: Place[]) {
    if (!places || places.length <= 1) {
      return;
    }

    this.changeCenter(
      new google.maps.LatLng({
        lat: places[0].point.x,
        lng: places[0].point.y,
      })
    );

    let wayPoints: google.maps.DirectionsWaypoint[] = [];
    for (let i = 1; i < places.length - 1; i++) {
      wayPoints.push({
        location: new google.maps.LatLng({
          lat: places[i].point.x,
          lng: places[i].point.y,
        }),
        stopover: true,
      } as google.maps.DirectionsWaypoint);
    }

    this.mapDirectionsService
      .route({
        origin: {
          lat: places[0].point.x,
          lng: places[0].point.y,
        },
        travelMode: TravelMode.WALKING,
        destination: {
          lat: places[places.length - 1].point.x,
          lng: places[places.length - 1].point.y,
        },
        provideRouteAlternatives: false,
        waypoints: wayPoints,
      })
      .subscribe((res) => {
        if (res.result) {
          this.creatorPlaceListService.routeLine = [res.result];
        }
      });
  }
  generateCreatorMapMarkers(places: Place[]) {
    if (!places || places.length <= 1) {
      this.creatorPlaceListService.markers = [];
      return;
    }

    this.creatorPlaceListService.markers = places.map((place) => {
      let marker: PlaceMapMarker = {
        label: place.name,
        options: this.mapMarkerCreatorView(place),
        position: {
          lat: place.point.x,
          lng: place.point.y,
        },
        tripPlaceInfo: {} as TripPlaceInfo,
      };
      return marker;
    });
  }
}
