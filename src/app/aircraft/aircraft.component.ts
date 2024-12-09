import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';


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

    savedAircraft = [
        {
            name: "Plane 1",
            textColour: "Darkblue",
            backgroundColour: "orange",
            icon: 3,
            wind: 12,
            precip: 30,
            vis: 10000,
        },
        {
            name: "Volantex Spitfire",
            textColour: "Darkgreen",
            backgroundColour: "lightgreen",
            icon: 10,
            wind: 12,
            precip: 30,
            vis: 10000,
        },
        {
            name: "Sonik Ranger Glider",
            textColour: "Black",
            backgroundColour: "lightblue",
            icon: 4,
            wind: 12,
            precip: 30,
            vis: 10000,
        },
        {
            name: "Plane 4",
            textColour: "white",
            backgroundColour: "Black",
            icon: 7,
            wind: 12,
            precip: 30,
            vis: 10000,
        },
        {
            name: "Plane 5",
            textColour: "purple",
            backgroundColour: "pink",
            icon: 9,
            wind: 12,
            precip: 30,
            vis: 10000,
        },
        {
            name: "Plane 6",
            textColour: "gray",
            backgroundColour: "lavender",
            icon: 1,
            wind: 12,
            precip: 30,
            vis: 10000,
        },
    ];
    selected_aircraft = 3;
    selected_icon = 1;

    constructor(private store: Store<AppState>
    ) {
    }

    openForm(boolValue: boolean) {
        this.open = boolValue;
    }

    ngOnInit() {

    }
}