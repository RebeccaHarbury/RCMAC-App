import { Route } from '@angular/router';
import { DetailDisplayComponent } from './detail-display/detail-display.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';

export const AppRoutes: Route[] = [
  {
    path: '',
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
