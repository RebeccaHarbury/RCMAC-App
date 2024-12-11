import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AircraftState } from "./aircraft.reducers";

export const selectAircraftState = (state:AppState) => state.aircraftInfo;
export const selectSavedAircraft = createSelector(selectAircraftState, (state: AircraftState) => state.aircraft);
export const selectSelectedAircraft = createSelector(selectAircraftState, (state: AircraftState) => state.selected);