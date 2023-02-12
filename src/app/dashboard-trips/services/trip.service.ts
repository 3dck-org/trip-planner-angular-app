import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Trip } from '../interfaces/trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  filteredTripList$ = (params: HttpParams) => <Observable<Trip[]>>this.http.get(
      `${environment.API_URL}/api/v1/trips`,
      {
        params: params,
      }
    );

  tripList$ = () =>
    <Observable<Trip[]>>(
      this.http.get(`${environment.API_URL}/api/v1/trips`, {})
    );

  sortedTrips$ = () =>
    <Observable<Trip[]>>this.http.get(`${environment.API_URL}/api/v1/trips`);

  updateFavoriteStatus$ = (trip: Trip) => <Observable<Trip>>this.http.put(
      `${environment.API_URL}api/v1/trips/${trip.id}`,
      {
        trip: {
          favorite: trip.favorite ? !trip.favorite : true,
        },
      }
    );
}
