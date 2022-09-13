import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('expires_in')) {
      let expiresDate = localStorage.getItem('expires_in');
      if (expiresDate !== null) {
        if (moment(expiresDate).isAfter(new Date().toISOString())) {
          return true;
        }
      }
    }
    this.router.navigate(['auth']);
    return false;
  }
}
