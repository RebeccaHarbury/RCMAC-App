import { FavouriteSite } from "./favourite/favourite.reducer";
import { PreferredTime } from "./time/time.reducer";
import { Thresholds } from "./thresholds/thresholds.reducer";

export interface AppState {
    favouriteLocation: FavouriteSite;
    timePreference: PreferredTime;
    weatherThresholds: Thresholds;
}