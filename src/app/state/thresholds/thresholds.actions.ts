import { createAction, props } from '@ngrx/store';

export const loadThresholds = createAction(
    '[Thresholds] Load Thresholds'
);

export const loadThresholdsSuccess = createAction(
    '[Thesholds] Thesholds Load Success',
    props<{ wind: number, precip: number, vis: number }>()
);

export const loadThresholdsFailure = createAction(
    '[Thesholds] Thesholds Load Failure',
    props<{ error: string }>()
);

export const changeThresholdWind = createAction(
    '[Thesholds] Change Wind',
    props<{ wind: number }>()
);

export const changeThresholdPrecip = createAction(
    '[Thesholds] Change Precipitation',
    props<{ precip: number }>()
);

export const changeThresholdVis = createAction(
    '[Thesholds] Change Visibility',
    props<{ vis: number }>()
);
