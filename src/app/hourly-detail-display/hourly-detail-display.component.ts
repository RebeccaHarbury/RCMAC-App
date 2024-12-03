import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '../services/app.service';
import { ThresholdService } from '../services/threshold.service';
import { AppState } from '../state/app.state';
import { loadTime } from '../state/time/time.actions';
import { selectTime } from '../state/time/time.selectors';

@Component({
  selector: 'hourly-detail-display',
  standalone: true,
  templateUrl: './hourly-detail-display.component.html',
  imports: [
    CommonModule
  ],
  styleUrl: './hourly-detail-display.component.scss'
})

export class HourlyDetailComponent implements OnInit {
  specificLocationData: any = [];
  prefTime$ = 17;

  appService = inject(AppService);
  thresholdService = inject(ThresholdService);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.store.dispatch(loadTime());
    this.store.select(selectTime).subscribe(time => {
      this.prefTime$ = time;
    })
  }

  idealConditions(data: any) {
    const wind = data.windSpeed10m;
    const precip = data.probOfPrecipitation;
    const vis = data.visibility;
    return this.thresholdService.conditionHighlight(wind, precip, vis);
  }

  scrollFunction(i: number) {
    const arrayLength = this.specificLocationData[0].hourlyData[i].length;
    const diff = 24 - arrayLength;
    const x = (this.prefTime$ - diff) * 225;
    const scrollElement = document.getElementsByClassName("scroll")[i];
    scrollElement.scrollTo(x, 0);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.specificLocationData.push(
      this.appService.getData(id));
    console.log('hourly display on init:', this.specificLocationData);
  }
}