import { FavouriteSite } from "./favourite/favourite.reducer";
import { PreferredTime } from "./time/time.reducer";

export interface AppState {
    favouriteLocation: FavouriteSite;
    timePreference: PreferredTime;
}