import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppService } from './services/app.service';
import { AppRoutes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { favouriteReducer } from './state/favourite/favourite.reducer';
import { TimeReducer } from './state/time/time.reducer';
import { thresholdReducer } from './state/thresholds/thresholds.reducer';
import { aircraftReducer } from './state/aircraft/aircraft.reducers';
import { provideEffects } from '@ngrx/effects';
import { AircraftEffects } from './state/aircraft/aircraft.effects';
import { ThresholdEffects } from './state/thresholds/thresholds.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    AppService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(AppRoutes),
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'favouriteLocation', reducer: favouriteReducer }),
    provideState({ name: 'timePreference', reducer: TimeReducer }),
    provideState({ name: 'weatherThresholds', reducer: thresholdReducer}),
    provideState({ name: 'aircraftInfo', reducer: aircraftReducer}),
    provideEffects(AircraftEffects, ThresholdEffects)

  ]
};
