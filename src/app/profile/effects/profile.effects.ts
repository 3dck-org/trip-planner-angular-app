import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { LoadingStateService } from '../../core/services/loading-state.service';
import { Injectable } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import * as ProfileActions from '../actions/profile.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private router: Router,
    private spinner: LoadingStateService
  ) {}

  currentProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.getProfile),
      tap(() => this.spinner.show()),
      exhaustMap((action) =>
        this.profileService.currentProfile$().pipe(
          map((profile) => ProfileActions.getProfileResponse({ profile })),
          catchError((error) => of(ProfileActions.error({ error })))
        )
      ),
      tap(() => this.spinner.hide())
    )
  );
}
