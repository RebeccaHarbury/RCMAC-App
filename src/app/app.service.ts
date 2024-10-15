import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DateTime } from 'luxon';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    //Okehampton data
    okehamptonData = { id: 0, name: 'Okehampton', lat: 50.7390, lon: -4.0032, hourlyData: <any>[], dailyData: <any>[] };

    //Torbay data
    torbayData = { id: 1, name: 'Torbay', lat: 50.4517, lon: -3.5579, hourlyData: <any>[], dailyData: <any>[] };

    //Woodbury data
    woodburyData = { id: 2, name: 'Woodbury', lat: 50.6768, lon: -3.4005, hourlyData: <any>[], dailyData: <any>[] };


    headers;

    constructor(public httpClient: HttpClient) {
        let headers = new HttpHeaders();
        this.headers = headers.set('apikey', 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyZWJlY2NhLmhhcmJ1cnlAbWV0b2ZmaWNlLmdvdi51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InJlYmVjY2EuaGFyYnVyeUBtZXRvZmZpY2UuZ292LnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWI4ZmM2NTUxLWU2MGEtNGI1My04Mzk5LTY1NTVkODczMjdhZiIsImlkIjo2MTI4LCJ1dWlkIjoiMDRjMTE0MWYtZDA2YS00NDM1LWI0YWMtMWE5MTY2YjdmN2YxIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NDQ4NTM1LCJqdGkiOiI5MzgwYmViMS1mZGE1LTRiZGMtYWRmYy02OTZkYTQxNDBiZTgifQ==.fb55x5LYvPAW4wHlfzIFJ8PjUXUuiSnZdsCLSO5efu235SeeXF1Z1gv1c0cX3tqBko7bDZv3kNl0d32GyHAuggflinN45-MszERXmKdOjX50MZDLSF7F_N-v-B2woYFFx7DxS3HU3bhfVLtbOEWQBwlcobY2NOSN8q2v6AoY9cfTju7k3wyr0Hk6emuHMtzplQvyXNaeeWSQuWiUUeScSYY9F1yJhR5h2KOmorqQAA3AAoglrx2P_R17o0VgBSw4tFHHwvJ9PMfenh_7ygD1K9-dFd7xOW7zDhnseSkx49dAUhSPRlVYs7rl55_8c9ghavzoX7lhy9P1VfP16J-c9A==');
    }

    addDays(date:any, days:number) {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }


    loadHourlyData() {


        //this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${this.okehamptonData.lat}&longitude=${this.okehamptonData.lon}`, { headers: this.headers }).subscribe((result: any) => {
        this.httpClient.get(`./hourlyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localHourlyData = result.features[0].properties.timeSeries
            const dateToday = DateTime.local().toISODate();
            const dateTomorrow = DateTime.local().plus({days: 1}).toISODate();
            console.log('today', dateToday,'tomorrow', dateTomorrow);
            //const todayOkehampton = localHourlyData.filter((hour:any) => hour.time.includes(dateToday));
            //const tomorOkehampton = localHourlyData.filter((hour:any) => hour.time.includes(dateTomorrow));            
            const todayOkehampton = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-27'));
            const tomorOkehampton = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-28'));


            this.okehamptonData.hourlyData.splice(0, 1, todayOkehampton, tomorOkehampton);
            //console.log("service1", localHourlyData);
        })

        //this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${this.torbayData.lat}&longitude=${this.torbayData.lon}`, { headers: this.headers }).subscribe((result: any) => {
        this.httpClient.get(`./hourlyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localHourlyData = result.features[0].properties.timeSeries
            const date = new Date()
            const dateToday = DateTime.local().toISODate();
            const dateTomorrow = DateTime.local().plus({days: 1}).toISODate();

            //const todayTorbay = localHourlyData.filter((hour:any) => hour.time.includes(dateToday));
            //const tomorTorbay = localHourlyData.filter((hour:any) => hour.time.includes(dateTomorrow));            
            const todayTorbay = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-27'));
            const tomorTorbay = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-28'));


            this.torbayData.hourlyData.splice(0, 1, todayTorbay, tomorTorbay);
            //console.log("service2", localHourlyData);
        })

        //this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${this.woodburyData.lat}&longitude=${this.woodburyData.lon}`, { headers: this.headers }).subscribe((result: any) => {
        this.httpClient.get(`./hourlyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localHourlyData = result.features[0].properties.timeSeries
            const date = new Date()
            const dateToday = DateTime.local().toISODate();
            const dateTomorrow = DateTime.local().plus({days: 1}).toISODate();

            //const todayWoodbury = localHourlyData.filter((hour:any) => hour.time.includes(dateToday));
            //const tomorWoodbury = localHourlyData.filter((hour:any) => hour.time.includes(dateTomorrow));            
            const todayWoodbury = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-27'));
            const tomorWoodbury = localHourlyData.filter((hour:any) => hour.time.includes('2024-09-28'));

          
            this.woodburyData.hourlyData.splice(0, 1, todayWoodbury, tomorWoodbury);

            //console.log("service3", localHourlyData);
        })
    }



    loadDailyData() {

        //this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?latitude=${this.okehamptonData.lat}&longitude=${this.okehamptonData.lon}`, { headers: this.headers }).subscribe((result: any) => {

        this.httpClient.get(`./dailyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localDailyData = result.features[0].properties.timeSeries;
            localDailyData.splice(0, 3);
            this.okehamptonData.dailyData.splice(0, 1, localDailyData);
            //console.log("service4", localDailyData);
        })

        //this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?latitude=${this.torbayData.lat}&longitude=${this.torbayData.lon}`, { headers: this.headers }).subscribe((result: any) => {

        this.httpClient.get(`./dailyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localDailyData = result.features[0].properties.timeSeries;
            localDailyData.splice(0, 3);
            this.torbayData.dailyData.splice(0, 1, localDailyData);
            //console.log("service5", localDailyData);
        })

        //this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?latitude=${this.woodburyData.lat}&longitude=${this.woodburyData.lon}`, { headers: this.headers }).subscribe((result: any) => {

        this.httpClient.get(`./dailyData.json`, { headers: this.headers }).subscribe((result: any) => {
            let localDailyData = result.features[0].properties.timeSeries;
            localDailyData.splice(0, 3);
            this.woodburyData.dailyData.splice(0, 1, localDailyData);
            //console.log("service6", localDailyData);
        })
    }


    getData(place_name: any) {
        if (place_name === this.okehamptonData.name) {
            return this.okehamptonData;
        }
        else if (place_name === this.torbayData.name) {
            return this.torbayData;
        }
        else if (place_name === this.woodburyData.name) {
            return this.woodburyData;
        }
        else return console.log('place name not valid');
    }
}
