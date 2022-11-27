import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as JourneyActions from './journey.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JourneyService } from './journey.service';
import { LoadingStateService } from '../../../core/services/loading-state.service';

@Injectable()
export class JourneyEffects {
  journeyCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JourneyActions.journeyCreate),
      tap(() => this.spinner.show()),
      exhaustMap((action) =>
        this.journeyService.createJourney$(action.tripId).pipe(
          map((journey) => JourneyActions.journeyCreateResponse({ journey })),
          catchError((error) => of(JourneyActions.error({ error })))
        )
      ),
      tap(() => this.spinner.hide())
    )
  );

  currentJourney$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JourneyActions.currentJourney),
      tap(() => this.spinner.show()),
      exhaustMap((action) =>
        this.journeyService.currentJourney$().pipe(
          map((journey) => JourneyActions.currentJourneyResponse({ journey })),
          catchError((error) => of(JourneyActions.error({ error })))
        )
      ),
      tap(() => this.spinner.hide())
    )
  );

  stopJourney$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JourneyActions.journeyStop),
      tap(() => this.spinner.show()),
      exhaustMap((action) =>
        this.journeyService.stopJourney$(action.journeyId).pipe(
          map((journey) => JourneyActions.journeyStopResponse({ journey })),
          catchError((error) => of(JourneyActions.error({ error })))
        )
      ),
      tap(() => this.spinner.hide())
    )
  );

  constructor(
    private actions$: Actions,
    private journeyService: JourneyService,
    private router: Router,
    private spinner: LoadingStateService
  ) {}
}
