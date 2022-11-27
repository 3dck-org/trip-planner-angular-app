import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  currentProfile$ = () =>
    <Observable<Profile>>(
      this.http.get(`${environment.API_URL}/api/v1/current_user`)
    );
}
