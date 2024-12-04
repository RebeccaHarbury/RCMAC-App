import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from './services/app.service';
import { navbarComponent } from "./nav-bar/nav-bar.component";
import { loadThresholds } from './state/thresholds/thresholds.actions';
import { selectPrecipThreshold, selectVisThreshold, selectWindThreshold } from './state/thresholds/thresholds.selectors';
import { AppState } from './state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, navbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'Devon RC Model Aircraft Club';
  pref_wind$ = 9;
  pref_precip$ = 20;
  pref_vis$ = 9000;

  service = inject(AppService);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadThresholds())
    this.store.select(selectWindThreshold).subscribe(wind => {
      this.pref_wind$ = wind;
    })
    this.store.select(selectPrecipThreshold).subscribe(precip => {
      this.pref_precip$ = precip;
    })
    this.store.select(selectVisThreshold).subscribe(vis => {
      this.pref_vis$ = vis;
    })
   }

  home() {
    this.service.cancelReroute(true);
  }

  ngOnInit() {
    this.service.loadHourlyData();
    this.service.loadDailyData();
    console.log('app component on init');
  }
}


