import {Component, OnInit} from '@angular/core';
import {AuthStateService} from "./services/auth-state.service";

@Component({
  selector: 'auth-page-component',
  templateUrl: './auth-page-component.component.html',
  styleUrls: ['./auth-page-component.component.scss']
})
export class AuthPageComponentComponent implements OnInit {

  constructor(public authStore: AuthStateService) {
  }

  ngOnInit(): void {
  }

}
