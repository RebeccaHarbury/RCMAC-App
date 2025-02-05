import { Injectable } from '@angular/core';
import {
  loadThresholds,
  loadThresholdsSuccess,
  loadThresholdsFailure,
  changeThresholdWind,
  changeThresholdPrecip,
  changeThresholdVis,
} from './thresholds.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectWindThreshold, selectPrecipThreshold, selectVisThreshold } from './thresholds.selectors';
import { AppState } from '../app.state';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { ThresholdService } from '../../services/threshold.service';

@Injectable()
export class ThresholdEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private thresholdService: ThresholdService
  ) { }

  loadThresholds$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadThresholds),
      switchMap(() =>
        from(this.thresholdService.getThresholds()).pipe(
          map(({ wind, precip, vis }) => loadThresholdsSuccess({ wind: wind, precip: precip, vis: vis })),
          catchError((error) => of(loadThresholdsFailure({ error })))
        )
      )
    )
  );

  setThresholdWind$ = createEffect(() =>
    this.action$.pipe(
      ofType(changeThresholdWind),
      withLatestFrom(this.store.select(selectWindThreshold)),
      switchMap(([actions, wind]) => this.thresholdService.setThresholdWind(wind))
    ),
    { dispatch: false }
  );

  setThresholdPrecip$ = createEffect(() =>
    this.action$.pipe(
      ofType(changeThresholdPrecip),
      withLatestFrom(this.store.select(selectPrecipThreshold)),
      switchMap(([actions, precip]) => this.thresholdService.setThresholdPrecip(precip))
    ),
    { dispatch: false }
  );

  setThresholdVis$ = createEffect(() =>
    this.action$.pipe(
      ofType(changeThresholdVis),
      withLatestFrom(this.store.select(selectVisThreshold)),
      switchMap(([actions, vis]) => this.thresholdService.setThresholdVis(vis))
    ),
    { dispatch: false }
  );

}
