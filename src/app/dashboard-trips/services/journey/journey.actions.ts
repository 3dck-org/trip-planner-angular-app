import { createAction, emptyProps, props } from '@ngrx/store';
import { Journey } from '../../interfaces/journey';

export const journeyCreate = createAction(
  '[Journey] Create',
  props<{ tripId: number }>()
);

export const journeyCreateResponse = createAction(
  '[Journey] Create Response',
  props<{ journey: Journey }>()
);

export const error = createAction(
  '[Journey] Create error',
  props<{ error: string }>()
);

export const currentJourney = createAction('[Journey] Current Journey');

export const currentJourneyResponse = createAction(
  '[Journey] Current Journey Response',
  props<{ journey: Journey }>()
);

export const journeyStop = createAction(
  '[Journey] Stop',
  props<{ journeyId: number }>()
);

export const journeyStopResponse = createAction('[Journey] Stop Response');
