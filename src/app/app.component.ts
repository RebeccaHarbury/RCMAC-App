import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { DetailDisplayComponent } from './detail-display/detail-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, DetailDisplayComponent, WeatherDisplayComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent implements OnInit {
  title = 'Devon RC Model Aircraft Club';

  //  searchTerm= '';
  //  place_name;


  service = inject(AppService)


  ngOnInit() {
    this.service.loadHourlyData();
    this.service.loadDailyData();
    console.log('app component on init')
  }
}


/* getLocation (placeName) {
  console.log('get location data');
  this.httpClient.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&searchExtent=-8,49,2,61&SingleLine=${placeName}`).subscribe((location_result:any) => {
    console.log(location_result);
    //obtain place name
    const place_name_response = (location_result).candidates[1].address;
    this.place_name = place_name_response.split(',')[0];
    console.log(this.place_name);
    //obtain co-ordinates
    const location = location_result.candidates[0].location;
    const lat = (location).y;
    const lon = (location).x;
    this.getData(lat, lon);
  })
}*/


/*
    clearSearchInput () {
    this.searchTerm = '';
  }
*/

