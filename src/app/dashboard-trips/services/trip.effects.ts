import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as TripActions from './trip.actions';
import { LoadingStateService } from '../../core/services/loading-state.service';
import { TripService } from './trip.service';
import { filteredListRequest, tripsListRequest } from './trip.actions';
import { HttpParams } from '@angular/common/http';
import { TripSearchParams } from '../../core/interfaces/trip-search-params';

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

  filteredListRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.filteredListRequest),
      tap(() => this.spinner.show()),
      exhaustMap((action) =>
        this.tripService
          .filteredTripList$(this.searchParamsToHttpParams(action.filterData))
          .pipe(
            map((tripsList) => TripActions.tripListResponse({ tripsList })),
            catchError((error) => of(TripActions.error({ error })))
          )
      ),
      tap(() => this.spinner.hide())
    )
  );

  searchParamsToHttpParams(tripSearchParams: TripSearchParams) {
    let httpParams = new HttpParams();
    if (tripSearchParams.category_names)
      httpParams = httpParams.append(
        'category_names',
        tripSearchParams.category_names
      );
    if (tripSearchParams.x && tripSearchParams.x !== '0') {
      httpParams = httpParams.append('x', tripSearchParams.x);
    }

    if (tripSearchParams.y && tripSearchParams.y !== '0')
      httpParams = httpParams.append('y', tripSearchParams.y);
    if (tripSearchParams.radius)
      httpParams = httpParams.append('radius', tripSearchParams.radius);
    return httpParams;
  }

  updateFavoriteStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.changeFavoriteStatus),
      tap(() => this.spinner.show()),
      exhaustMap((action) =>
        this.tripService.updateFavoriteStatus$(action.trip).pipe(
          map((trip) => TripActions.changeFavoriteStatusResponse({ trip })),
          catchError((error) => of(TripActions.error({ error })))
        )
      ),
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
