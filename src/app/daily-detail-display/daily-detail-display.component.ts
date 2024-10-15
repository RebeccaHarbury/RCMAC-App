import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'daily-detail-display',
  standalone: true,
  templateUrl: './daily-detail-display.component.html',
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    DatePipe,
  ],
  styleUrl: './daily-detail-display.component.scss'
})
export class DailyDetailComponent implements OnInit {
  specificLocationData: any = [];

  service = inject(AppService);
  constructor(
    private route: ActivatedRoute,

  ) {}

  idealConditions(i:number) {
    if ((this.specificLocationData[0].dailyData[0][i].midday10MWindSpeed) <= 9 
    && (this.specificLocationData[0].dailyData[0][i].dayProbabilityOfPrecipitation) <= 20 
    && (this.specificLocationData[0].dailyData[0][i].middayVisibility) >= 9000) {
      console.log('All true!')
      return true;
    } else {
      return false;
    }

    //this.locationData[i].hourlyData[0][2].windGustSpeed10m

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.specificLocationData.push(
      this.service.getData(id));
    console.log('daily display on init:', this.specificLocationData);

  }
}