import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { PreferredTime } from "./time.reducer";

export const selectTimeState = (state: AppState) => state.timePreference;
export const selectTime = createSelector(selectTimeState, (state: PreferredTime) => state.time);