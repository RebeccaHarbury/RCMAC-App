import { createReducer, on } from "@ngrx/store";
import { loadThresholds, loadThresholdsSuccess, loadThresholdsFailure, changeThresholdWind, changeThresholdPrecip, changeThresholdVis } from "./thresholds.actions";

export interface Thresholds {
  wind: number;
  precip: number;
  vis: number;
  error: any;
  status: string;
};

export const initialThresholdState: Thresholds = {
  wind: 9,
  precip: 20,
  vis: 9000,
  error: null,
  status: 'pending',
};

export const thresholdReducer = createReducer(
  initialThresholdState,
  on(changeThresholdWind, (state, { wind }) => ({
    ...state,
    wind: wind,
  })),

  on(changeThresholdPrecip, (state, { precip }) => ({
    ...state,
    precip: precip,
  })),

  on(changeThresholdVis, (state, { vis }) => ({
    ...state,
    vis: vis,
  })),

  on(loadThresholds, (state) => ({ ...state, status: 'loading' })),

  on(loadThresholdsSuccess, (state, { wind, precip, vis }) => ({
    ...state,
    wind: wind,
    precip: precip,
    vis: vis,
    error: null,
    status: 'success',
  })),

  on(loadThresholdsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
)


