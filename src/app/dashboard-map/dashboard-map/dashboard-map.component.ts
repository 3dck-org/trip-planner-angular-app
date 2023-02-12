import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {
  getRoadParts,
  State,
} from '../../dashboard-trips/services/journey/journey.reducer';
import { Store } from '@ngrx/store';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
import { RoadPart } from '../../core/interfaces/road-part';
import { SelectedPlaceInfoService } from '../../journey/services/selected-place-info.service';
import { BehaviorSubject } from 'rxjs';
import { PlaceMapMarker } from '../../core/interfaces/place-map-marker';
import TravelMode = google.maps.TravelMode;
import { MapRouteLineService } from '../../dashboard/services/map-route-line.service';

@Component({
  selector: 'tp-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMapComponent {
  zoom = 15;

  public mapMarkers: PlaceMapMarker[] = [];
  public onMapReady(map: google.maps.Map): void {
    map.panTo(this.center);
    this.changeZoom(15);
  }

  public center: google.maps.LatLng = new google.maps.LatLng({
    lat: 52.237049,
    lng: 21.017532,
  });

  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  generateMapMarkers(roadParts: RoadPart[]) {
    if (!roadParts || roadParts.length <= 1) {
      this.mapMarkers = [];
      return;
    }

    this.mapMarkers = roadParts.map((roadPart) => {
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
    readonly mapRouteLineService: MapRouteLineService
  ) {
    this.store.select(getRoadParts).subscribe((res) => {
      this.direction(res);
      this.generateMapMarkers(res);
    });
  }

  changeZoom(val: number) {
    this.zoom = val;
  }

  changeCenter(position: google.maps.LatLng) {
    if (this.center != position) this.center = position;
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
          this.mapRouteLineService.routeLine = [];
          this.mapRouteLineService.routeLine = [res.result];
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

  directionsOptions(): google.maps.DirectionsRendererOptions {
    return {
      markerOptions: { visible: false },
    };
  }
}
