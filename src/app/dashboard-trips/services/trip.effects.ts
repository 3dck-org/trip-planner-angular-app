import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as TripActions from './trip.actions';
import { LoadingStateService } from '../../core/services/loading-state.service';
import { TripService } from './trip.service';
import { tripsListRequest } from './trip.actions';

@Injectable()
export class TripEffects {
  tripsListRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.tripsListRequest),
      tap(() => this.spinner.show()),
      exhaustMap((action) =>
        this.tripService.tripList$().pipe(
          map((tripsList) => TripActions.tripListResponse({ tripsList })),
          catchError((error) => of(TripActions.error({ error })))
        )
      ),
      tap(() => this.spinner.hide())
    )
  );

  constructor(
    private actions$: Actions,
    private spinner: LoadingStateService,
    private tripService: TripService
  ) {}
}
