import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AircraftService {

  constructor() { }

  async getAircraft(): Promise<any> {
    const localStorageResult = JSON.parse(localStorage.getItem('aircraft')!);
    return localStorageResult.aircraft;
  }

  async saveAircraft(aircraft: object): Promise<any> {
    return localStorage.setItem('aircraft', JSON.stringify(aircraft));
  }
}