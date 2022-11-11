import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  constructor(private router: Router) {}

  private authTypeTabSubject = new BehaviorSubject<string>('login');

  get authTypeTab() {
    return this.authTypeTabSubject.value;
  }

  updateAuthTypeTab(val: string = 'login') {
    return this.authTypeTabSubject.next(val);
  }

  logout() {
    localStorage.setItem('access_token', '');
    localStorage.setItem('refresh_token', '');
    localStorage.setItem('token_type', '');
    localStorage.setItem('expires_in', '');
    this.router.navigate(['auth']);
  }
}
