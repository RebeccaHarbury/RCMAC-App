import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { loadTime, setTime } from '../state/time/time.actions';
import { selectTime } from '../state/time/time.selectors';
import { addFavourite, loadFavourite } from '../state/favourite/favourite.actions';
import { selectFavourite } from '../state/favourite/favourite.selectors';
import { selectPrecipThreshold, selectVisThreshold, selectWindThreshold } from '../state/thresholds/thresholds.selectors';
import { changeThresholdPrecip, changeThresholdVis, changeThresholdWind, loadThresholds } from '../state/thresholds/thresholds.actions';

@Component({
  selector: 'preferences-component',
  standalone: true,
  templateUrl: './preferences.component.html',
  imports: [
    CommonModule,
  ],
  styleUrl: './preferences.component.scss'
})

export class PreferencesComponent implements OnInit {
  displayPrefLocation = false;
  displayPrefTime = false;
  fav_location$: String = new String;
  pref_time$ = 17;
  pref_wind$ = 9;
  pref_precip$ = 20;
  pref_vis$ = 9000;


  constructor(private store: Store<AppState>
  ) {
    this.store.dispatch(loadFavourite());
    this.store.select(selectFavourite).subscribe(favourite => {
      this.fav_location$ = favourite;
    })

    this.store.dispatch(loadTime())
    this.store.select(selectTime).subscribe(time => {
      this.pref_time$ = time;
    })

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

  onSetLocation(location: string) {
    this.store.dispatch(addFavourite({ location }))
  }

  isPrefLocation(location: string) {
    if (location === this.fav_location$) {
      return true;
    }
    else {
      return false;
    }
  }

  onSetTime(time: number) {
    this.store.dispatch(setTime({ time }))
  }

  isPrefTime(time: number) {
    if (time === this.pref_time$) {
      return true;
    }
    else {
      return false;
    }
  }

  onSetThresholds(wind: number, precip: number, vis: number) {
    this.store.dispatch(changeThresholdWind({ wind }));
    this.store.dispatch(changeThresholdPrecip({ precip }));
    this.store.dispatch(changeThresholdVis({ vis }));
  }

  onChangeThresholds() {
    const wind = Number((<HTMLInputElement>document.getElementById("wind")).value);
    const precip = Number((<HTMLInputElement>document.getElementById("precip")).value);
    const vis = Number((<HTMLInputElement>document.getElementById("vis")).value);
    this.store.dispatch(changeThresholdWind({ wind }));
    this.store.dispatch(changeThresholdPrecip({ precip }));
    this.store.dispatch(changeThresholdVis({ vis }));
  }

  isPrefThresholds(wind: number, precip: number, vis: number) {
    if (wind === this.pref_wind$ && precip === this.pref_precip$ && vis === this.pref_vis$) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit() {

  }
}