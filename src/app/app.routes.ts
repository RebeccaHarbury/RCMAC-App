import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailDisplayComponent } from './detail-display/detail-display.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { WeatherDataComponent } from './weather-data/weather-data.component';

export const routes: Routes = [
  { path: 'home',
    title: 'home',
    component: WeatherDisplayComponent
    },
  { path: 'name',
    title: 'name',
    component: DetailDisplayComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }