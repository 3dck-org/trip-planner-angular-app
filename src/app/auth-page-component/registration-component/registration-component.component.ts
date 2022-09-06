import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthStateService } from '../services/auth-state.service';
import { LoadingStateService } from '../../core/services/loading-state.service';
import * as AuthActions from '../services/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.scss'],
})
export class RegistrationComponentComponent implements OnInit {
  fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authState: AuthStateService,
    public spinner: LoadingStateService,
    private store: Store
  ) {
    spinner.hide();
    this.fg = this.fb.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    const credentials = {
      email: this.fg.get('email')?.value,
      password: this.fg.get('password')?.value,
      name: this.fg.get('name')?.value,
      surname: this.fg.get('surname')?.value,
      login: this.fg.get('login')?.value,
    };
    this.store.dispatch(AuthActions.registerRequest({ credentials }));
  }
}
