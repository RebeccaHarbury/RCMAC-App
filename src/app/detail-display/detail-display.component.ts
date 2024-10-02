import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WeatherDataComponent } from '../weather-data/weather-data.component';

@Component({
  selector: 'detail-display-component',
  standalone: true,
  templateUrl: './detail-display.component.html',
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    DatePipe,
    WeatherDataComponent,
  ],
  styleUrl: './detail-display.component.scss'
})
export class DetailDisplayComponent {

  constructor() {
  }
  @Input() place = '';
  @Input() date = '';
  @Input() icon = '';
  @Input() up = '';
  @Input() down = '';
  @Input() dayTemperature = '';
  @Input() highTemperature = '';
  @Input() lowTemperature = '';
  @Input() win = '';
  @Input() precip = '';
  @Input() vis = '';
  @Input() dayWind = '';
  @Input() dayPrecipitation = '';
  @Input() dayVisibility = '';

}