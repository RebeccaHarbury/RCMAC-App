import { Route } from '@angular/router';
import { DetailDisplayComponent } from './detail-display/detail-display.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { provideEffects } from '@ngrx/effects';
import { FavouriteEffects } from './state/favourite/favourite.effects';
import { TimeEffects } from './state/time/time.effects';
import { ThresholdEffects } from './state/thresholds/thresholds.effects';

export const AppRoutes: Route[] = [
  {
    path: '',
    providers: [provideEffects(FavouriteEffects), provideEffects(TimeEffects)],
    title: 'Home',
    component: WeatherDisplayComponent
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'Preferences',
    providers: [provideEffects(ThresholdEffects)],
    title: 'Preferences',
    component: PreferencesComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    title: '',
    component: DetailDisplayComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  },
];
