import { Route } from '@angular/router';
import { DetailDisplayComponent } from './detail-display/detail-display.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { provideEffects } from '@ngrx/effects';
import { FavouriteEffects } from './state/favourite/favourite.effects';
import { TimeEffects } from './state/time/time.effects';

export const AppRoutes: Route[] = [
  {
    path: '',
    providers: [provideEffects(FavouriteEffects), provideEffects(TimeEffects)],
    title: 'Home',
    component: WeatherDisplayComponent
  },
  {
    path: ':id',
    title: '',
    component: DetailDisplayComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
