import { TestBed } from '@angular/core/testing';

import { SelectedPlaceInfoService } from './selected-place-info.service';

describe('SelectedPlaceInfoService', () => {
  let service: SelectedPlaceInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedPlaceInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
