import { createAction, props } from '@ngrx/store';

export const loadFavourite = createAction(
    '[FavouriteSite] Load Favourite'
);

export const loadFavouriteSuccess = createAction(
    '[FavouriteSite] Favourite Load Success',
    props<{ location: string }>()
);

export const loadFavouriteFailure = createAction(
    '[FavouriteSite] Favourite Load Failure',
    props<{ error: string }>()
);

export const addFavourite = createAction(
    '[FavouriteSite] Add Favourite',
    props<{ location: string }>()
);

export const deleteFavourite = createAction(
    '[FavouriteSite] Delete Favourite',
    props<{ location: string }>()
);
