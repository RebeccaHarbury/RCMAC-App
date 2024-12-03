import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { ThresholdService } from '../services/threshold.service';

@Component({
  selector: 'daily-detail-display',
  standalone: true,
  templateUrl: './daily-detail-display.component.html',
  imports: [
    CommonModule,
  ],
  styleUrl: './daily-detail-display.component.scss'
})

export class DailyDetailComponent implements OnInit {
  specificLocationData: any = [];

  appService = inject(AppService);
  thresholdService = inject(ThresholdService);

  constructor(
    private route: ActivatedRoute,
  ) { }

  idealConditions(data: any) {
    const wind = data.midday10MWindSpeed;
    const precip = data.dayProbabilityOfPrecipitation;
    const vis = data.middayVisibility;
    return this.thresholdService.conditionHighlight(wind, precip, vis);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.specificLocationData.push(
      this.appService.getData(id));
    console.log('daily display on init:', this.specificLocationData);
  }
}