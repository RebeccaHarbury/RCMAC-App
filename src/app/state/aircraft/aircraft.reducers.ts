import { createReducer, on } from "@ngrx/store";
import { addAircraft, changeSelectedAircraft, loadAircraft, loadAircraftFailure, loadAircraftSuccess, loadSelectedAircraft, loadSelectedAircraftFailure, loadSelectedAircraftSuccess, removeAircraft } from "./aircraft.actions";


export interface AircraftInfo {
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
    selected: string;
    error: any;
    status: string;
};

export const initialAircraftState: AircraftState = {
    aircraft: [],
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

    on(addAircraft, (state, { details }) => ({
        ...state,
        aircraft: [ ...state?.aircraft || [], details ],
    }
)),

    on(removeAircraft, (state, { name }) => ({
        ...state,
        aircraft: state.aircraft.filter((aircraft) => aircraft.name !== name),
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