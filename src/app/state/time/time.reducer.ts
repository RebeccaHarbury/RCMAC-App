import { createReducer, on } from "@ngrx/store";
import { setTime, loadTime, loadTimeFailure, loadTimeSuccess } from "./time.actions";

export interface PreferredTime {
  time: number;
  error: any;
  status: string;
};

export const initialTimeState: PreferredTime = {
  time: 17,
  error: null,
  status: 'pending',
};

export const TimeReducer = createReducer(
  initialTimeState,
  on(setTime, (state, { time }) => ({
    ...state,
    time: time
  })),

  on(loadTime, (state) => ({ ...state, status: 'loading' })),

  on(loadTimeSuccess, (state, { time }) => ({
    ...state,
    time: time,
    error: null,
    status: 'success',
  })),

  on(loadTimeFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
)


