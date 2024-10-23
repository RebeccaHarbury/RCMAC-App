import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { FavouriteSite } from "./favourite.reducer";


export const selectFavouriteState = (state:AppState) => state.favouriteLocation;
export const selectFavourite = createSelector(selectFavouriteState, (state) => state.location);