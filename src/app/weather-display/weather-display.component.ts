import { Component, Input, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppService } from '../app.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'weather-display-component',
  standalone: true,
  templateUrl: './weather-display.component.html',
  imports: [
    CommonModule,
    DatePipe,
    RouterLink,
  ],
  styleUrl: './weather-display.component.scss'
})
export class WeatherDisplayComponent {
  locationData: any = [];
  dailyData: any = [];
  place_data = [
    { name: 'Okehampton', lat: 50.7390, lon: -4.0032 },
    { name: 'Torbay', lat: 50.4517, lon: -3.5579 },
    { name: 'Woodbury', lat: 50.6768, lon: -3.4005 }
  ];
  dateNow = new Date()

  service = inject(AppService)

  constructor() {
  }

  ngOnInit() {

    this.locationData.push(
      this.service.getData('Okehampton'));
    this.locationData.push(
      this.service.getData('Torbay'));
    this.locationData.push(
      this.service.getData('Woodbury'));
    console.log('weather display on init:', this.locationData);

  }
}