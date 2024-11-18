import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { DetailDisplayComponent } from './detail-display/detail-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, DetailDisplayComponent, WeatherDisplayComponent, CommonModule, ReactiveFormsModule, FormsModule, MatButtonToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'Devon RC Model Aircraft Club';

  service = inject(AppService);

  reroute = this.service.boolValue;

  onSwitch() {
    this.reroute =! this.reroute;
    this.service.sendValue(this.reroute);
  }

  ngOnInit() {
    this.service.loadHourlyData();
    this.service.loadDailyData();
    console.log('app component on init');
  }
}


