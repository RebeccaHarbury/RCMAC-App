import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class FavouriteService {

  constructor() { }

  async getFavourite(): Promise<any> {
    return localStorage.getItem('favourite');
  }

  async setFavourite(location: string): Promise<any> {
    return localStorage.setItem('favourite', location);
  }
}