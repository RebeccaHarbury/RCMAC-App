import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DetailDisplayComponent } from './detail-display/detail-display.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';

export const AppRoutes: Route[] = [
  {
    path: '',
    title: 'home',
    component: WeatherDisplayComponent
  },
  {
    path: ':id',
    title: '/:id',
    component: DetailDisplayComponent
  },

];