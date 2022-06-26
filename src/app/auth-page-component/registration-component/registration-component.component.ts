import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthStateService} from "../services/auth-state.service";
import {LoadingStateService} from "../services/loading-state.service";

@Component({
  selector: 'registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.scss']
})
export class RegistrationComponentComponent implements OnInit {

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

  register() {

  }

}
