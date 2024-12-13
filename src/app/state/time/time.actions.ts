import { createAction, props } from '@ngrx/store';

export const loadTime = createAction(
    '[PreferredTime] Load Time'
);

export const loadTimeSuccess = createAction(
    '[PreferredTime] Time Load Success',
    props<{ time: number }>()
);

export const loadTimeFailure = createAction(
    '[PreferredTime] Time Load Failure',
    props<{ error: string }>()
);

export const setTime = createAction(
    '[PreferredTime] Set Time',
    props<{ time: number }>()
);
