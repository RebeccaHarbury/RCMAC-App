import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { AppRoutes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { favouriteReducer } from './state/favourite/favourite.reducer';
import { TimeReducer } from './state/time/time.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    AppService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(AppRoutes),
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'favouriteLocation', reducer: favouriteReducer }),
    provideState({ name: 'timePreference', reducer: TimeReducer })
  ]
};
