import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from './auth-page-component/services/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'trip-planner-angular-app';
  constructor(public router: Router, private authState: AuthStateService) {}

  logout() {
    this.authState.logout();
  }
}
