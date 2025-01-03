import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

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

  service = inject(AppService);

  constructor(
    private route: ActivatedRoute,
  ) { }

  idealConditions(data: any) {
    const wind = data.midday10MWindSpeed;
    const precip = data.dayProbabilityOfPrecipitation;
    const vis = data.middayVisibility;
    return this.service.conditionHighlight(wind, precip, vis);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.specificLocationData.push(
      this.service.getData(id));
    console.log('daily display on init:', this.specificLocationData);
  }
}