import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class TimeService {

  constructor() { }

  async getTime(): Promise<any> {
    return Number(localStorage.getItem('time'));
  }

  async setTime(time: number): Promise<any> {
    return localStorage.setItem('time', time.toString());
  }

 }