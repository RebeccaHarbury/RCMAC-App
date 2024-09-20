import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CommonModule } from '@angular/common';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent, WeatherDisplayComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  headers: HttpHeaders;
  hourlyData:any = [];
  dailyData:any = [];
  allData:any = [];
  location_data:any = [];
//  searchTerm= '';
  place_name;
  place_data = [
    {name: 'Okehampton', lat: 50.7390, lon: -4.0032}, 
    {name: 'Torbay', lat: 50.4517, lon: -3.5579}, 
    {name: 'Woodbury', lat: 50.6768, lon: -3.4005}];
  constructor(public httpClient: HttpClient) {
    let headers = new HttpHeaders();
    this.headers = headers.set('apikey', 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyZWJlY2NhLmhhcmJ1cnlAbWV0b2ZmaWNlLmdvdi51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InJlYmVjY2EuaGFyYnVyeUBtZXRvZmZpY2UuZ292LnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWI4ZmM2NTUxLWU2MGEtNGI1My04Mzk5LTY1NTVkODczMjdhZiIsImlkIjo2MTI4LCJ1dWlkIjoiMDRjMTE0MWYtZDA2YS00NDM1LWI0YWMtMWE5MTY2YjdmN2YxIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NDQ4NTM1LCJqdGkiOiI5MzgwYmViMS1mZGE1LTRiZGMtYWRmYy02OTZkYTQxNDBiZTgifQ==.fb55x5LYvPAW4wHlfzIFJ8PjUXUuiSnZdsCLSO5efu235SeeXF1Z1gv1c0cX3tqBko7bDZv3kNl0d32GyHAuggflinN45-MszERXmKdOjX50MZDLSF7F_N-v-B2woYFFx7DxS3HU3bhfVLtbOEWQBwlcobY2NOSN8q2v6AoY9cfTju7k3wyr0Hk6emuHMtzplQvyXNaeeWSQuWiUUeScSYY9F1yJhR5h2KOmorqQAA3AAoglrx2P_R17o0VgBSw4tFHHwvJ9PMfenh_7ygD1K9-dFd7xOW7zDhnseSkx49dAUhSPRlVYs7rl55_8c9ghavzoX7lhy9P1VfP16J-c9A==');
  }

  
  getData = (_lat, _lon) => {
    
    //this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${_lat}&longitude=${_lon}`, {headers:this.headers}).subscribe((hourly_data:any) => {
      this.httpClient.get(`./hourlyData.json`, {headers:this.headers}).subscribe((hourly_data:any) => {
      console.log(_lat, _lon);
      //console.log(hourly_data);
      this.hourlyData[0] = hourly_data.features[0].properties.timeSeries[2];
      console.log(this.hourlyData);
    })    
    
    //this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?latitude=${_lat}&longitude=${_lon}`, {headers:this.headers}).subscribe((daily_data:any) => {
      this.httpClient.get(`./hourlyData.json`, {headers:this.headers}).subscribe((daily_data:any) => {
      console.log(_lat, _lon);
      daily_data.features[0].properties.timeSeries.shift();
      this.dailyData[0] = daily_data;
      //this.dailyData[0] = this.dailyData.shift();
      console.log(this.dailyData);
          
    })
    this.allData = [this.hourlyData, this.dailyData];
    this.location_data.push(this.allData);

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
    for(var i = 0;i<this.place_data.length;i++) {
      this.getData(this.place_data[i].lat, this.place_data[i].lon);
      
      //let LocationHourlyData[i] = this.hourlyData;
      //let LocationDailyData[i] = this.dailyData;
      //console.log(LocationHourlyData[i], LocationDailyData[i])


    }
    console.log(this.location_data);
//this is a comment for testing commit

/*
    clearSearchInput () {
    this.searchTerm = '';
  }
*/    
}
}
