import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthPageComponentComponent} from './auth-page-component/auth-page-component.component';
import {
  RegistrationComponentComponent
} from './auth-page-component/registration-component/registration-component.component';
import {LoginComponentComponent} from './auth-page-component/login-component/login-component.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPasswordStrengthModule} from "@angular-material-extensions/password-strength";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponentComponent,
    RegistrationComponentComponent,
    LoginComponentComponent
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
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
