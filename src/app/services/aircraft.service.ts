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

  async getAircraftNumber(): Promise<any> {
    return Number(localStorage.getItem('aircraftNumber'));
  }

  async saveAircraftNumber(number: number): Promise<any> {
    return localStorage.setItem('aircraftNumber', number.toString());
  }

  async getSelectedAircraft(): Promise<any> {
    return localStorage.getItem('selectedAircraft')!;;
  }

  async saveSelectedAircraft(selected: string): Promise<any> {
    return localStorage.setItem('selectedAircraft', selected);
  }

}