import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as stream from 'stream';

@Component({
  selector: 'tp-dashboard-search',
  templateUrl: './dashboard-search.component.html',
  styleUrls: ['./dashboard-search.component.scss'],
})
export class DashboardSearchComponent {
  searchField;

  constructor(readonly fb: FormBuilder) {
    this.searchField = fb.group({ searchParam: [''] });
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log({ lat: latitude, lng: longitude });
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  search() {
    console.log(this.searchField.value);
  }
}
