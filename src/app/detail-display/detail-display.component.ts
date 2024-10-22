import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from '../app.service';
import { WeatherDisplayComponent } from '../weather-display/weather-display.component';
import { DailyDetailComponent } from '../daily-detail-display/daily-detail-display.component';
import { HourlyDetailComponent } from '../hourly-detail-display/hourly-detail-display.component';
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'detail-display-component',
  standalone: true,
  templateUrl: './detail-display.component.html',
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    DatePipe,
    WeatherDisplayComponent,
    DailyDetailComponent,
    HourlyDetailComponent
  ],
  styleUrl: './detail-display.component.scss'
})

export class DetailDisplayComponent implements OnInit {
  specificLocationData: any = [];

  service = inject(AppService);

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.titleService.setTitle(`${id}`);
  }
}