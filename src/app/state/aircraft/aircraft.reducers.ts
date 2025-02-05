import { createReducer, on } from "@ngrx/store";
import { addAircraft, changeSelectedAircraft, incrementId, loadAircraft, loadAircraftFailure, loadAircraftNumber, loadAircraftNumberFailure, loadAircraftNumberSuccess, loadAircraftSuccess, loadSelectedAircraft, loadSelectedAircraftFailure, loadSelectedAircraftSuccess, removeAircraft } from "./aircraft.actions";

export interface AircraftInfo {
    id: number,
    name: string,
    icon: string,
    textColour: string,
    backgroundColour: string,
    wind: string,
    precip: string,
    vis: string
}

export interface AircraftState {
    aircraft: AircraftInfo[];
    aircraftNumber: number;
    selected: string;
    error: any;
    status: string;
};

export const initialAircraftState: AircraftState = {
    aircraft: [],
    aircraftNumber: 0,
    selected: '',
    error: null,
    status: 'pending',
};

export const aircraftReducer = createReducer(
    initialAircraftState,
    on(loadAircraft, (state) => ({ ...state, status: 'loading' })),

    on(loadAircraftSuccess, (state, { aircraft }) => ({
        ...state,
        aircraft: aircraft,
        error: null,
        status: 'success',
    })),

    on(loadAircraftFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    })),

    on(loadAircraftNumber, (state) => ({ ...state, status: 'loading' })),

    on(loadAircraftNumberSuccess, (state, { aircraftNumber }) => ({
        ...state,
        aircraftNumber: aircraftNumber,
        error: null,
        status: 'success',
    })),

    on(loadAircraftNumberFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    })),

    on(addAircraft, (state, { details }) => ({
        ...state,
        aircraft: [details, ...state.aircraft],
    })),

    on(incrementId, (state) => ({
        ...state,
        aircraftNumber: (state.aircraftNumber) + 1,
    })),

    on(removeAircraft, (state, { id }) => ({
        ...state,
        aircraft: state.aircraft.filter((aircraft) => aircraft.id !== id),
    })),

    on(loadSelectedAircraft, (state) => ({ ...state, status: 'loading' })),

    on(loadSelectedAircraftSuccess, (state, { selected }) => ({
        ...state,
        selected: selected,
        error: null,
        status: 'success',
    })),

    on(loadSelectedAircraftFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    })),

    on(changeSelectedAircraft, (state, { selected }) => ({
        ...state,
        selected: selected,
    })),
)