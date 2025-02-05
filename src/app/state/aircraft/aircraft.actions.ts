import { createAction, emptyProps, props } from "@ngrx/store";
import { AircraftInfo } from "./aircraft.reducers";

export const loadAircraft = createAction(
    '[Aircraft] Load Aircraft'
);

export const loadAircraftSuccess = createAction(
    '[Aircraft] Aircraft Load Success',
    props<{ aircraft: AircraftInfo[] }>()
);

export const loadAircraftFailure = createAction(
    '[Aircraft] Aircraft Load Failure',
    props<{ error: string }>()
);

export const loadAircraftNumber = createAction(
    '[Aircraft] Load Aircraft Number'
);

export const loadAircraftNumberSuccess = createAction(
    '[Aircraft] Aircraft Number Load Success',
    props<{ aircraftNumber: number }>()
);

export const loadAircraftNumberFailure = createAction(
    '[Aircraft] Aircraft Number Load Failure',
    props<{ error: string }>()
);

export const addAircraft = createAction(
    '[Aircraft] Add Aircraft',
    props<{ details: AircraftInfo }>()
);

export const incrementId = createAction(
    '[Aircraft] Increment Id',
    emptyProps
)

export const removeAircraft = createAction(
    '[Aircraft] Remove Aircraft',
    props<{ id: number }>()
);

export const loadSelectedAircraft = createAction(
    '[Aircraft] Load Selected Aircraft'
);

export const loadSelectedAircraftSuccess = createAction(
    '[Aircraft] Load Selected Aircraft Success',
    props<{ selected: string }>()
);

export const loadSelectedAircraftFailure = createAction(
    '[Aircraft] Load Selected Aircraft Failure',
    props<{ error: string }>()
);

export const changeSelectedAircraft = createAction(
    '[Aircraft] Change Selected Aircraft',
    props<{ selected: string }>()
);