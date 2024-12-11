import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { addAircraft, loadAircraft } from '../state/aircraft/aircraft.actions';
import { selectSavedAircraft } from '../state/aircraft/aircraft.selectors';


@Component({
    selector: 'aircraft-component',
    standalone: true,
    templateUrl: './aircraft.component.html',
    imports: [
        CommonModule,
    ],
    styleUrl: './aircraft.component.scss'
})

export class AircraftComponent implements OnInit {
    open = false;

    savedAircraft: any[] = [];
    selected_aircraft = "Plane 1";
    selected_icon = 1;
    

    constructor(private store: Store<AppState>
    ) {
        this.store.dispatch(loadAircraft());
        this.store.select(selectSavedAircraft).subscribe(aircraft => {
            this.savedAircraft = aircraft;
        })
    }

    openForm(boolValue: boolean) {
        this.open = boolValue;
    }

    onSelected(value: string) {
        this.selected_icon = Number(value);
    }

    newAircraft(
        name: string,
        icon: string,
        textColour: string,
        backgroundColour: string,
        wind: string,
        precip: string,
        vis: string
    ) {
        const details = {
            name,
            icon,
            textColour,
            backgroundColour,
            wind,
            precip,
            vis            
        }
        console.log(details);
        this.store.dispatch(addAircraft({ details
        }))
    }

    ngOnInit() {

    }
}