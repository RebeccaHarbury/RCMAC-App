import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DateTime } from 'luxon';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    //hourly data http call
    httpHourly = 'https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?'

    //daily data http call
    httpDaily = 'https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?'

    dateToday = DateTime.local().toISODate();
    dateTomorrow = DateTime.local().plus({days: 1}).toISODate();    

    okehamptonData = { 
        id: 0, 
        name: 'Okehampton', 
        lat: 50.7390, 
        lon: -4.0032, 
        hourlyData: <any>[], 
        dailyData: <any>[] };

    torbayData = { 
        id: 1, 
        name: 'Torbay', 
        lat: 50.4517, 
        lon: -3.5579, 
        hourlyData: <any>[], 
        dailyData: <any>[] };

    woodburyData = { 
        id: 2, 
        name: 'Woodbury', 
        lat: 50.6768, 
        lon: -3.4005, 
        hourlyData: <any>[], 
        dailyData: <any>[] };

    //switch between local and remote data
    localData = true

    headers;

    constructor(public httpClient: HttpClient) {
        let headers = new HttpHeaders();
        this.headers = headers.set('apikey', 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyZWJlY2NhLmhhcmJ1cnlAbWV0b2ZmaWNlLmdvdi51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InJlYmVjY2EuaGFyYnVyeUBtZXRvZmZpY2UuZ292LnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWI4ZmM2NTUxLWU2MGEtNGI1My04Mzk5LTY1NTVkODczMjdhZiIsImlkIjo2MTI4LCJ1dWlkIjoiMDRjMTE0MWYtZDA2YS00NDM1LWI0YWMtMWE5MTY2YjdmN2YxIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NDQ4NTM1LCJqdGkiOiI5MzgwYmViMS1mZGE1LTRiZGMtYWRmYy02OTZkYTQxNDBiZTgifQ==.fb55x5LYvPAW4wHlfzIFJ8PjUXUuiSnZdsCLSO5efu235SeeXF1Z1gv1c0cX3tqBko7bDZv3kNl0d32GyHAuggflinN45-MszERXmKdOjX50MZDLSF7F_N-v-B2woYFFx7DxS3HU3bhfVLtbOEWQBwlcobY2NOSN8q2v6AoY9cfTju7k3wyr0Hk6emuHMtzplQvyXNaeeWSQuWiUUeScSYY9F1yJhR5h2KOmorqQAA3AAoglrx2P_R17o0VgBSw4tFHHwvJ9PMfenh_7ygD1K9-dFd7xOW7zDhnseSkx49dAUhSPRlVYs7rl55_8c9ghavzoX7lhy9P1VfP16J-c9A==');
    }

    loadHourlyData() {
        //Okehampton hourly data
        if (this.localData == false) {
        this.httpClient.get(`${this.httpHourly}latitude=${this.okehamptonData.lat}&longitude=${this.okehamptonData.lon}`, { headers: this.headers }).subscribe((result: any) => {
            let localHourlyData = result.features[0].properties.timeSeries
            const todayOkehampton = localHourlyData.filter((hour:any) => hour.time.includes(this.dateToday));
            const tomorOkehampton = localHourlyData.filter((hour:any) => hour.time.includes(this.dateTomorrow));
            this.okehamptonData.hourlyData.splice(0, 1, todayOkehampton, tomorOkehampton);
        })}
        else {
        this.httpClient.get(`./hourlyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localHourlyData = result.features[0].properties.timeSeries
            const todayOkehampton = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-27'));
            const tomorOkehampton = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-28'));
            this.okehamptonData.hourlyData.splice(0, 1, todayOkehampton, tomorOkehampton);
        })}

        //Torbay hourly data
        if (this.localData == false) {
        this.httpClient.get(`${this.httpHourly}latitude=${this.torbayData.lat}&longitude=${this.torbayData.lon}`, { headers: this.headers }).subscribe((result: any) => {
            let localHourlyData = result.features[0].properties.timeSeries
            const todayTorbay = localHourlyData.filter((hour:any) => hour.time.includes(this.dateToday));
            const tomorTorbay = localHourlyData.filter((hour:any) => hour.time.includes(this.dateTomorrow));
            this.torbayData.hourlyData.splice(0, 1, todayTorbay, tomorTorbay);
        })}
        else {
        this.httpClient.get(`./spareHourlyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localHourlyData = result.features[0].properties.timeSeries
            const todayTorbay = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-27'));
            const tomorTorbay = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-28'));
            this.torbayData.hourlyData.splice(0, 1, todayTorbay, tomorTorbay);
        })}

        //Woodbury hourly data
        if (this.localData == false) {
        this.httpClient.get(`${this.httpHourly}latitude=${this.woodburyData.lat}&longitude=${this.woodburyData.lon}`, { headers: this.headers }).subscribe((result: any) => {
        let localHourlyData = result.features[0].properties.timeSeries
        const todayWoodbury = localHourlyData.filter((hour:any) => hour.time.includes(this.dateToday));
        const tomorWoodbury = localHourlyData.filter((hour:any) => hour.time.includes(this.dateTomorrow));
        this.woodburyData.hourlyData.splice(0, 1, todayWoodbury, tomorWoodbury);
        })}
        else {
        this.httpClient.get(`./spareHourlyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localHourlyData = result.features[0].properties.timeSeries
            const todayWoodbury = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-27'));
            const tomorWoodbury = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-28'));
            this.woodburyData.hourlyData.splice(0, 1, todayWoodbury, tomorWoodbury);
        })}
    }

    loadDailyData() {
        //Okehampton daily data
        if (this.localData == false) {
        this.httpClient.get(`${this.httpDaily}latitude=${this.okehamptonData.lat}&longitude=${this.okehamptonData.lon}`, { headers: this.headers }).subscribe((result: any) => {
            let localDailyData = result.features[0].properties.timeSeries;
            localDailyData.splice(0, 2);
            this.okehamptonData.dailyData.splice(0, 1, localDailyData);
        })}
        else {
        this.httpClient.get(`./dailyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localDailyData = result.features[0].properties.timeSeries;
            localDailyData.splice(0, 2);
            this.okehamptonData.dailyData.splice(0, 1, localDailyData);
        })}

        //Torbay daily data
        if (this.localData == false) {
        this.httpClient.get(`${this.httpDaily}latitude=${this.torbayData.lat}&longitude=${this.torbayData.lon}`, { headers: this.headers }).subscribe((result: any) => {
            let localDailyData = result.features[0].properties.timeSeries;
            localDailyData.splice(0, 2);
            this.torbayData.dailyData.splice(0, 1, localDailyData);
        })}
        else {
        this.httpClient.get(`./dailyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localDailyData = result.features[0].properties.timeSeries;
            localDailyData.splice(0, 2);
            this.torbayData.dailyData.splice(0, 1, localDailyData);
        })}

        //Woodbury daily data
        if (this.localData == false) {
        this.httpClient.get(`${this.httpDaily}latitude=${this.woodburyData.lat}&longitude=${this.woodburyData.lon}`, { headers: this.headers }).subscribe((result: any) => {
            let localDailyData = result.features[0].properties.timeSeries;
            localDailyData.splice(0, 2);
            this.woodburyData.dailyData.splice(0, 1, localDailyData);
        })}
        else {
        this.httpClient.get(`./dailyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localDailyData = result.features[0].properties.timeSeries;
            localDailyData.splice(0, 2);
            this.woodburyData.dailyData.splice(0, 1, localDailyData);
        })}
    }


    getData(place_name: any) {
        if (place_name == this.okehamptonData.name) {
            return this.okehamptonData;
        }
        else if (place_name == this.torbayData.name) {
            return this.torbayData;
        }
        else if (place_name == this.woodburyData.name) {
            return this.woodburyData;
        }
        else return console.log('place name not valid');
    }


    conditionHighlight(wind:number, precip:number, vis:number) {
    if (wind <= 9 
    && precip <= 20 
    && vis >= 9000) {
        return true;
    } 
    else {
        return false;
    }}
}