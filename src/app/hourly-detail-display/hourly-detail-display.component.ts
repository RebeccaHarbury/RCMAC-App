import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from '../app.service';
import { HorizontalScrollDirective } from '../horizontal-scroll.directive';

@Component({
  selector: 'hourly-detail-display',
  standalone: true,
  templateUrl: './hourly-detail-display.component.html',
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    DatePipe,
    HorizontalScrollDirective
  ],
  styleUrl: './hourly-detail-display.component.scss'
})
export class HourlyDetailComponent implements OnInit {
  specificLocationData: any = [];

  service = inject(AppService);
  constructor(
    private route: ActivatedRoute,

  ) {}

  idealConditions(day:number, i:number) {
    if ((this.specificLocationData[0].hourlyData[day][i].windSpeed10m) <= 9 
    && (this.specificLocationData[0].hourlyData[day][i].probOfPrecipitation) <= 20 
    && (this.specificLocationData[0].hourlyData[day][i].visibility) >= 9000) {
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
    console.log('hourly display on init:', this.specificLocationData);

  }
}