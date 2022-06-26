import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthStateService} from "../services/auth-state.service";
import {LoadingStateService} from "../services/loading-state.service";

@Component({
  selector: 'login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  fg: FormGroup;

  constructor(private fb: FormBuilder, public authState: AuthStateService,
              public spinner: LoadingStateService) {
    spinner.hide();
    this.fg = this.fb.group({
      username: [''],
      password: [''],
    })
  }

  ngOnInit(): void {

  }

  login() {
  }
}
