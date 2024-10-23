import { createAction, emptyProps, props } from '@ngrx/store';
import { FavouriteSite } from './favourite.reducer';



export const addFavourite = createAction(
    '[FavouriteSite] Add Favourite',
    props<{ location: String }>(),
)

export const deleteFavourite = createAction(
    '[FavouriteSite] Delete Favourite',
    props<{ location: String }>(),
)
