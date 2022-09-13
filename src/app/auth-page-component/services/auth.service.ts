import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/response/auth-response';
import { environment } from '../../../environments/environment';
import { client } from '../../const/config-const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register$ = (
    email: string,
    password: string,
    name: string,
    surname: string,
    login: string
  ) => <Observable<AuthResponse>>this.http.post(
      `${environment.API_URL}/api/v1/users`,
      {
        email: email,
        password: password,
        client_id: client.id,
        client_secret: client.secret,
        grant_type: 'password',
        name: name,
        surname: surname,
        login: login,
      }
    );
  login$ = (email: string, password: string) =>
    <Observable<AuthResponse>>this.http.post(
      `${environment.API_URL}/oauth/token`,
      {
        email: email,
        password: password,
        client_id: client.id,
        client_secret: client.secret,
        grant_type: 'password',
      }
    );
}
