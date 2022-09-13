import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../interfaces/trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  tripList$ = () =>
    <Observable<Trip[]>>this.http.get(`${environment.API_URL}/api/v1/trips`);
}