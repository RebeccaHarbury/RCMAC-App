import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'hourly-detail-display',
  standalone: true,
  templateUrl: './hourly-detail-display.component.html',
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    DatePipe,
  ],
  styleUrl: './hourly-detail-display.component.scss'
})
export class HourlyDetailComponent implements OnInit {
  specificLocationData: any = [];

  service = inject(AppService);

  constructor(
    private route: ActivatedRoute,
  ) { }

  idealConditions(data: any) {
    const wind = data.windSpeed10m;
    const precip = data.probOfPrecipitation;
    const vis = data.visibility;
    return this.service.conditionHighlight(wind, precip, vis);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.specificLocationData.push(
      this.service.getData(id));
    console.log('hourly display on init:', this.specificLocationData);
  }
}