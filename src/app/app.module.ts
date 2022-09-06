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
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { DashboardTripElementComponent } from './dashboard-trip-element/dashboard-trip-element/dashboard-trip-element.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TripEffects } from './dashboard-trips/services/trip.effects';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponentComponent,
    RegistrationComponentComponent,
    LoginComponentComponent,
    UserProfileComponent,
    DashboardComponent,
    DashboardMapComponent,
    DashboardTripsComponent,
    DashboardSearchComponent,
    DashboardTripElementComponent,
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
    StoreModule.forRoot({ auth: authReducer, trips: tripReducer }, {}),
    EffectsModule.forRoot([AuthEffects, TripEffects]),
    GoogleMapsModule,
    MatExpansionModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
