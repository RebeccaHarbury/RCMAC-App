import { createReducer, on } from "@ngrx/store";
import { addFavourite, deleteFavourite } from "./favourite.actions";


export interface FavouriteSite {
    location: String,
}

export const initialFavouriteState: FavouriteSite = {
    location: "",
};

export const favouriteReducer = createReducer(
    initialFavouriteState,
    on(addFavourite, (state, { location }) => ({
       ...state,
       location: location }
    )),
    on(deleteFavourite, (state) => ({
        ...state,
        favouriteLocation: state.location = "",
    }))
)


