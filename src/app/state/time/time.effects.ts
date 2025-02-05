import { Injectable } from '@angular/core';
import {
  setTime,
  loadTime,
  loadTimeSuccess,
  loadTimeFailure,
} from './time.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectTime } from './time.selectors';
import { AppState } from '../app.state';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { TimeService } from '../../services/time.service';

@Injectable()
export class TimeEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private timeService: TimeService
  ) { }

  loadTime$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadTime),
      switchMap(() =>
        from(this.timeService.getTime()).pipe(
          map((time: number) => loadTimeSuccess({ time: time })),
          catchError((error) => of(loadTimeFailure({ error })))
        )
      )
    )
  );

  setTime$ = createEffect(() =>
    this.action$.pipe(
      ofType(setTime),
      withLatestFrom(this.store.select(selectTime)),
      switchMap(([actions, time]) => this.timeService.setTime(time))
    ),
    { dispatch: false }
  );

}
