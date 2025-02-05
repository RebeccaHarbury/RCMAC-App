import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { loadTime, setTime } from '../state/time/time.actions';
import { selectTime } from '../state/time/time.selectors';
import { addFavourite, loadFavourite } from '../state/favourite/favourite.actions';
import { selectFavourite } from '../state/favourite/favourite.selectors';
import { selectPrecipThreshold, selectVisThreshold, selectWindThreshold } from '../state/thresholds/thresholds.selectors';
import { changeThresholdPrecip, changeThresholdVis, changeThresholdWind, loadThresholds } from '../state/thresholds/thresholds.actions';
import { changeSelectedAircraft, loadAircraft, loadSelectedAircraft } from '../state/aircraft/aircraft.actions';
import { selectSavedAircraft, selectSelectedAircraft } from '../state/aircraft/aircraft.selectors';

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
  savedAircraft: any[] = new Array;
  selected_aircraft = 'None';


  constructor(private store: Store<AppState>
  ) {
    this.store.dispatch(loadFavourite());
    this.store.select(selectFavourite).subscribe(favourite => {
      this.fav_location$ = favourite;
    })

    this.store.dispatch(loadTime());
    this.store.select(selectTime).subscribe(time => {
      this.pref_time$ = time;
    })

    this.store.dispatch(loadThresholds());
    this.store.select(selectWindThreshold).subscribe(wind => {
      this.pref_wind$ = wind;
    })
    this.store.select(selectPrecipThreshold).subscribe(precip => {
      this.pref_precip$ = precip;
    })
    this.store.select(selectVisThreshold).subscribe(vis => {
      this.pref_vis$ = vis;
    })

    this.store.dispatch(loadAircraft());
    this.store.select(selectSavedAircraft).subscribe(aircraft => {
      this.savedAircraft = aircraft;
    })
    this.store.dispatch(loadSelectedAircraft());
    this.store.select(selectSelectedAircraft).subscribe(name => {
      this.selected_aircraft = name;
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

  onChangeThresholds(wind: any, precip: any, vis: any) {
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

  onSelectAircraft(aircraft: any) {
    const selected: string = aircraft.name
    this.store.dispatch(changeSelectedAircraft({ selected }))
    this.onChangeThresholds(aircraft.wind, aircraft.precip, aircraft.vis)
  }

  removeSelectedAircraft(selected: string) {
    this.store.dispatch(changeSelectedAircraft({ selected }))
  }

  isSelectedAircraft(name: string) {
    if (name === this.selected_aircraft) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
  }
}