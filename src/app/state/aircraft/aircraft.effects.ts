import { Injectable } from "@angular/core";
import { selectNumberAircraft, selectSavedAircraft, selectSelectedAircraft } from "./aircraft.selectors";
import { 
    addAircraft, 
    changeSelectedAircraft, 
    loadAircraft, 
    loadAircraftFailure, 
    loadAircraftNumber, 
    loadAircraftNumberFailure, 
    loadAircraftNumberSuccess, 
    loadAircraftSuccess, 
    loadSelectedAircraft, 
    loadSelectedAircraftSuccess, 
    removeAircraft
 } from "./aircraft.actions";
import { AircraftService } from "../../services/aircraft.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { createEffect, ofType, Actions } from "@ngrx/effects";

@Injectable()
export class AircraftEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private aircraftService: AircraftService
    ) { }

    loadAircraft$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAircraft),
            switchMap(() =>
                from(this.aircraftService.getAircraft()).pipe(
                    map((aircraft) => loadAircraftSuccess({ aircraft: aircraft })),
                    catchError((error) => of(loadAircraftFailure({ error })))
                )
            ),
        ));

    loadAircraftNumber$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAircraftNumber),
            switchMap(() =>
                from(this.aircraftService.getAircraftNumber()).pipe(
                    map((aircraftNumber) => loadAircraftNumberSuccess({ aircraftNumber: aircraftNumber })),
                    catchError((error) => of(loadAircraftNumberFailure({ error })))
                )
            ),
        ));

    loadSelectedAircraft$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSelectedAircraft),
            switchMap(() =>
                from(this.aircraftService.getSelectedAircraft()).pipe(
                    map((selected) => loadSelectedAircraftSuccess({ selected: selected })),
                    catchError((error) => of(loadAircraftFailure({ error })))
                )
            ),
        ));

    saveAircraft$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addAircraft, removeAircraft),
                withLatestFrom(this.store.select(selectSavedAircraft)),
                switchMap(([action, aircraft]) => from(this.aircraftService.saveAircraft({ aircraft }))),
                withLatestFrom(this.store.select(selectNumberAircraft)),
                switchMap(([action, number]) => from(this.aircraftService.saveAircraftNumber(number))),
            ),
        { dispatch: false }
    );

    saveSelectedAircraft$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(changeSelectedAircraft),
                withLatestFrom(this.store.select(selectSelectedAircraft)),
                switchMap(([action, selected]) => from(this.aircraftService.saveSelectedAircraft(selected))),
            ),
        { dispatch: false }
    );


}