import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { DetailDisplayComponent } from './detail-display/detail-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DetailDisplayComponent, WeatherDisplayComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  //  searchTerm= '';
  //  place_name;
  hourlyData: any = [];
  dailyData: any = [];
  place_data = [
    { name: 'Okehampton', lat: 50.7390, lon: -4.0032 },
    { name: 'Torbay', lat: 50.4517, lon: -3.5579 },
    { name: 'Woodbury', lat: 50.6768, lon: -3.4005 }
  ];


  service = inject(AppService)


  getData(_lat, _lon) {

    this.getHourlyData(_lat, _lon);
    this.getDailyData(_lat, _lon);

  }


  async getHourlyData(_lat, _lon) {

    this.service.getHourlyData(_lat, _lon).subscribe((hourly_data: any) => {

      console.log(_lat, _lon, hourly_data);
      this.hourlyData.push(hourly_data);

    },
    )
  }

  async getDailyData(_lat, _lon) {

    this.service.getDailyData(_lat, _lon).subscribe((daily_data: any) => {

      console.log(_lat, _lon, daily_data);
      this.dailyData.push(daily_data);

    },
    )
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

  ngOnInit() {

    for (var i = 0; i < this.place_data.length; i++) {

      this.getData(this.place_data[i].lat, this.place_data[i].lon);

    }
    /*
        clearSearchInput () {
        this.searchTerm = '';
      }
    */
  }
}
