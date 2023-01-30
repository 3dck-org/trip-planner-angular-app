import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapPlaceCreateFormComponent } from './roadmap-place-create-form.component';

describe('RoadmapPlaceCreateFormComponent', () => {
  let component: RoadmapPlaceCreateFormComponent;
  let fixture: ComponentFixture<RoadmapPlaceCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapPlaceCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapPlaceCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
