import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppService } from '../app.service';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { Store } from '@ngrx/store';
import { selectFavourite } from '../state/favourite/favourite.selectors';
import { AppState } from '../state/app.state';
import { addFavourite, deleteFavourite, loadFavourite, routeFavourite } from '../state/favourite/favourite.actions';

@Component({
  selector: 'weather-display-component',
  standalone: true,
  templateUrl: './weather-display.component.html',
  imports: [
    CommonModule,
    DatePipe,
    RouterLink,
  ],
  styleUrl: './weather-display.component.scss'
})

export class WeatherDisplayComponent implements OnInit {
  dateNow = DateTime.local().toISO();
  locationData: any = [];
  fav_img = '';
  reroute = false;
  home = false;

  service = inject(AppService);

  fav_location$: String = new String;

  constructor(private store: Store<AppState>) {
    this.service.rerouteValue.subscribe((value) => this.reroute = value.valueOf())
    this.service.homeValue.subscribe((value) => this.home = value.valueOf())
    if (this.reroute === true && this.home === false) {
      this.store.dispatch(routeFavourite())
    }
    this.store.dispatch(loadFavourite())
    this.store.select(selectFavourite).subscribe(favourite => {
      this.fav_location$ = favourite
    })
  }

  onFavourite(event: Event, location: string) {
    event.stopPropagation()
    event.preventDefault()

    if (this.fav_location$ !== location) {
      this.store.dispatch(addFavourite({ location }))
    }
    else {
      this.store.dispatch(deleteFavourite({ location }))
    }
  }

  idealConditions(data: any) {
    const wind = data.windSpeed10m;
    const precip = data.probOfPrecipitation;
    const vis = data.visibility;
    return this.service.conditionHighlight(wind, precip, vis);
  }

  isFavourite(location: string) {
    if (location === this.fav_location$) {
      this.fav_img = 'images/star-filled.png';
      return true;
    }
    else {
      this.fav_img = 'images/star-empty.png';
      return false;
    }
  }

  ngOnInit() {
    this.locationData.push(this.service.getData('Okehampton'));
    this.locationData.push(this.service.getData('Torbay'));
    this.locationData.push(this.service.getData('Woodbury'));
  }
}