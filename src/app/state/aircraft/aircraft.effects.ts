import { Injectable } from "@angular/core";
import { selectSavedAircraft, selectSelectedAircraft } from "./aircraft.selectors";
import { addAircraft, loadAircraft, loadAircraftFailure, loadAircraftSuccess, removeAircraft } from "./aircraft.actions";
import { AircraftService } from "../../services/aircraft.service";
import { of, from } from "rxjs";
import { switchMap, map, tap, catchError, withLatestFrom} from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { createEffect, ofType, Actions } from "@ngrx/effects";

@Injectable()
export class AircraftEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private aircraftService: AircraftService
    ) {}

    loadAircraft$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loadAircraft),
        switchMap(() => 
            from(this.aircraftService.getAircraft()).pipe(
                map((aircraft) => loadAircraftSuccess({ aircraft: aircraft })),
                catchError((error) => of(loadAircraftFailure({ error })))
            )
        )
    ));

    saveAircraft$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addAircraft, removeAircraft),
                withLatestFrom(this.store.select(selectSavedAircraft)),
                switchMap(([action, aircraft]) => from(this.aircraftService.saveAircraft({ aircraft })))
            ),
        { dispatch: false }
    );


}