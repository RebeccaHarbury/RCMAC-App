import { Injectable } from '@angular/core';
import {
  addFavourite,
  deleteFavourite,
  loadFavourite,
  loadFavouriteSuccess,
  loadFavouriteFailure,
} from './favourite.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import {  Store } from '@ngrx/store';
import { selectFavourite } from './favourite.selectors';
import { AppState } from '../app.state';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { FavouriteService } from '../../weather-display/favourite.service';

@Injectable()
export class FavouriteEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private favouriteService: FavouriteService,
  ) {}

  loadFavourite$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadFavourite),
      switchMap(() =>
        from(this.favouriteService.getFavourite()).pipe(
          map((location:string) => loadFavouriteSuccess({ location: location })),
          catchError((error) => of(loadFavouriteFailure({ error })))
        )
      )
    )
  );

  setFavourite$ = createEffect(() =>
    this.action$.pipe(
        ofType(addFavourite, deleteFavourite),
        withLatestFrom(this.store.select(selectFavourite)),
        switchMap(([actions, location]) => this.favouriteService.setFavourite(location))
        ),
    { dispatch: false }
  );

}

