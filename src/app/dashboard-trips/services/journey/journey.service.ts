import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journey } from '../../interfaces/journey';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  constructor(private http: HttpClient) {}

  createJourney$ = (tripId: number) => <Observable<Journey>>this.http.post(
      `${environment.API_URL}/api/v1/journeys`,
      {
        trip_id: tripId,
        start_at: new Date(),
      }
    );

  currentJourney$ = () =>
    <Observable<Journey[]>>(
      this.http.get(`${environment.API_URL}/api/v1/journeys`)
    );
}
