import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { setTime } from './state/time/time.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'Devon RC Model Aircraft Club';

  service = inject(AppService);

  reroute = this.service.boolValue;

  constructor(private store: Store<AppState>) { }

  home() {
    this.service.cancelReroute(true);
  }

  onSwitch() {
    this.reroute = !this.reroute;
    this.service.rerouteBool(this.reroute);
  }

  onSetTime(time: number) {
    this.store.dispatch(setTime({ time }))
  }

  ngOnInit() {
    this.service.loadHourlyData();
    this.service.loadDailyData();
    console.log('app component on init');
  }
}


