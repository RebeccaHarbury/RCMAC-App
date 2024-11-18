import { createReducer, on } from "@ngrx/store";
import { addFavourite, deleteFavourite, loadFavourite, loadFavouriteFailure, loadFavouriteSuccess } from "./favourite.actions";


export interface FavouriteSite {
    location: string;
    error: any;
    status: string;
    
}

export const initialFavouriteState: FavouriteSite = {
    location: '',
    error: null,
    status: 'pending',
};

export const favouriteReducer = createReducer(
    initialFavouriteState,
    on(addFavourite, (state, { location }) => ({
       ...state,
       location: location }
    )),

    on(deleteFavourite, (state) => ({
        ...state,
        location: "",
    })),

    on(loadFavourite, (state) => ({ ...state, status: 'loading' })),

    on(loadFavouriteSuccess, (state, { location }) => ({
      ...state,
      location: location,
      error: null,
      status: 'success',
    })),

    on(loadFavouriteFailure, (state, { error }) => ({
      ...state,
      error: error,
      status: 'error',
    })),
)


