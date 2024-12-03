import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Thresholds } from "./thresholds.reducer";

export const selectThresholdState = (state:AppState) => state.weatherThresholds;
export const selectWindThreshold = createSelector(selectThresholdState, (state: Thresholds) => state.wind);
export const selectPrecipThreshold = createSelector(selectThresholdState, (state: Thresholds) => state.precip);
export const selectVisThreshold = createSelector(selectThresholdState, (state: Thresholds) => state.vis);