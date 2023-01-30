import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponentComponent } from './auth-page-component/auth-page-component.component';
import { RegistrationComponentComponent } from './auth-page-component/registration-component/registration-component.component';
import { LoginComponentComponent } from './auth-page-component/login-component/login-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './auth-page-component/services/auth.reducer';
import { tripReducer } from './dashboard-trips/services/trip.reducer';
import { AuthEffects } from './auth-page-component/services/auth.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth-page-component/services/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DashboardMapComponent } from './dashboard-map/dashboard-map/dashboard-map.component';
import { DashboardTripsComponent } from './dashboard-trips/dashboard-trips/dashboard-trips.component';
import { DashboardSearchComponent } from './dashboard-search/dashboard-search/dashboard-search.component';
import { DashboardTripElementComponent } from './dashboard-trip-element/dashboard-trip-element/dashboard-trip-element.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TripEffects } from './dashboard-trips/services/trip.effects';
import { journeyReducer } from './dashboard-trips/services/journey/journey.reducer';
import { JourneyEffects } from './dashboard-trips/services/journey/journey.effects';
import { ProfileComponent } from './profile/profile/profile.component';
import { MatChipsModule } from '@angular/material/chips';
import { ProfileEffects } from './profile/effects/profile.effects';
import { profileReducer } from './profile/reducers/profile.reducer';
import { NgOptimizedImage } from '@angular/common';
import { JourneyComponent } from './journey/journey/journey.component';
import { JourneyRoadmapComponent } from './journey/journey-roadmap/journey-roadmap.component';
import { MatStepperModule } from '@angular/material/stepper';
import { JourneyRoadmapTitleComponent } from './journey/journey-roadmap-title/journey-roadmap-title.component';
import { RoadmapPlaceDescriptionComponent } from './journey/roadmap-place-description/roadmap-place-description.component';
import { CategoryListComponent } from './core/category-list/category-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TripCreatorComponent } from './trip-creator/trip-creator/trip-creator.component';
import { TripDescriptionComponent } from './trip-creator/trip-description/trip-description.component';
import { RoadmapCreatorComponent } from './trip-creator/roadmap-creator/roadmap-creator.component';
import { RoadmapPlaceCreateFormComponent } from './trip-creator/roadmap-place-create-form/roadmap-place-create-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponentComponent,
    RegistrationComponentComponent,
    LoginComponentComponent,
    DashboardComponent,
    DashboardMapComponent,
    DashboardTripsComponent,
    DashboardSearchComponent,
    DashboardTripElementComponent,
    ProfileComponent,
    JourneyComponent,
    JourneyRoadmapComponent,
    JourneyRoadmapTitleComponent,
    RoadmapPlaceDescriptionComponent,
    CategoryListComponent,
    TripCreatorComponent,
    TripDescriptionComponent,
    RoadmapCreatorComponent,
    RoadmapPlaceCreateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatPasswordStrengthModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    OverlayModule,
    //@ts-ignore
    StoreModule.forRoot(
      {
        auth: authReducer,
        trips: tripReducer,
        journey: journeyReducer,
        profile: profileReducer,
      },
      {}
    ),
    EffectsModule.forRoot([
      AuthEffects,
      TripEffects,
      JourneyEffects,
      ProfileEffects,
    ]),
    GoogleMapsModule,
    MatExpansionModule,
    MatChipsModule,
    NgOptimizedImage,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    DragDropModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
