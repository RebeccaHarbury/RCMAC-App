import { Injectable } from '@angular/core';
import { loadThresholds } from '../state/thresholds/thresholds.actions';
import { selectPrecipThreshold, selectVisThreshold, selectWindThreshold } from '../state/thresholds/thresholds.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Injectable({ providedIn: 'root' })
export class ThresholdService {

    windCond$ = 9;
    precipCond$ = 20;
    visCond$ = 9000;

    constructor(private store: Store<AppState>) {
        this.store.dispatch(loadThresholds())
        this.store.select(selectWindThreshold).subscribe(wind => {
            this.windCond$ = wind;
        })
        this.store.select(selectPrecipThreshold).subscribe(precip => {
            this.precipCond$ = precip;
        })
        this.store.select(selectVisThreshold).subscribe(vis => {
            this.visCond$ = vis;
        })
    }

    async getThresholds(): Promise<any> {
        const wind = Number(localStorage.getItem('wind'));
        const precip = Number(localStorage.getItem('precip'));
        const vis = Number(localStorage.getItem('vis'));
        return { wind, precip, vis }
    }

    async setThresholdWind(wind: number): Promise<any> {
        return localStorage.setItem('wind', wind.toString());
    }

    async setThresholdPrecip(precip: number): Promise<any> {
        return localStorage.setItem('precip', precip.toString());
    }

    async setThresholdVis(vis: number): Promise<any> {
        return localStorage.setItem('vis', vis.toString());
    }

    conditionHighlight(wind: number, precip: number, vis: number) {
        if (wind <= this.windCond$ && precip <= this.precipCond$ && vis >= this.visCond$) {
            return true;
        }
        else {
            return false;
        }
    }
}