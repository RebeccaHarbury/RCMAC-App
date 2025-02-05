import { FavouriteSite } from "./favourite/favourite.reducer";
import { PreferredTime } from "./time/time.reducer";
import { Thresholds } from "./thresholds/thresholds.reducer";
import { AircraftState } from "./aircraft/aircraft.reducers";

export interface AppState {
    favouriteLocation: FavouriteSite;
    timePreference: PreferredTime;
    weatherThresholds: Thresholds;
    aircraftInfo: AircraftState
}