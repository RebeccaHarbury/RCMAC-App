import { Route } from '@angular/router';
import { DetailDisplayComponent } from './detail-display/detail-display.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { provideEffects } from '@ngrx/effects';
import { FavouriteEffects } from './state/favourite/favourite.effects';

export const AppRoutes: Route[] = [
  {
    path: '',
    providers: [provideEffects(FavouriteEffects)],
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
