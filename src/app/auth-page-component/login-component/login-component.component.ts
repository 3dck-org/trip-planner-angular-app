import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthStateService } from '../services/auth-state.service';
import { LoadingStateService } from '../services/loading-state.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';

@Component({
  selector: 'login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authState: AuthStateService,
    public spinner: LoadingStateService,
    private store: Store
  ) {
    spinner.hide();
    this.fg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    const credentials = {
      email: this.fg.get('email')?.value,
      password: this.fg.get('password')?.value,
    };
    this.store.dispatch(AuthActions.loginRequest({ credentials }));
  }
}
