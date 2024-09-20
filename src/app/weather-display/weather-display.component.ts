import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'weather-display-component',
  standalone: true,
  templateUrl: './weather-display.component.html',
  imports: [
    CommonModule,
    DatePipe
  ],
  styleUrl: './weather-display.component.scss'
})
export class WeatherDisplayComponent {
  constructor() {
  }
  @Input() place = '';
  @Input() date = '';
  @Input() icon = '';
  @Input() up = '';
  @Input() down = '';
  @Input() bigIcon = true;
  @Input() currentTemperature = '';
  @Input() currentTemp = true;
  @Input() highTemperature = '';
  @Input() lowTemperature = '';


}
