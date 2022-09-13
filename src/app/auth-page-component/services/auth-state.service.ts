import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  constructor() {}

  private authTypeTabSubject = new BehaviorSubject<string>('login');

  get authTypeTab() {
    return this.authTypeTabSubject.value;
  }

  updateAuthTypeTab(val: string = 'login') {
    return this.authTypeTabSubject.next(val);
  }
}
