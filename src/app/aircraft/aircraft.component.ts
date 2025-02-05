import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { addAircraft, changeSelectedAircraft, incrementId, loadAircraft, loadAircraftNumber, removeAircraft } from '../state/aircraft/aircraft.actions';
import { selectNumberAircraft, selectSavedAircraft, selectSelectedAircraft } from '../state/aircraft/aircraft.selectors';


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
    newOpen = false;
    editOpen = false;
    deleteOpen = false;
    savedAircraft: any[] = new Array;
    selected_aircraft = "Plane 1";
    selected_icon = 1;
    aircraft_id = 0;
    current_index = 0;

    constructor(private store: Store<AppState>
    ) {
        this.store.dispatch(loadAircraft());
        this.store.dispatch(loadAircraftNumber());
        this.store.select(selectSavedAircraft).subscribe(aircraft => {
            this.savedAircraft = aircraft;
        })
        this.store.select(selectNumberAircraft).subscribe(aircraftNumber => {
            this.aircraft_id = aircraftNumber;
        })
        this.store.select(selectSelectedAircraft).subscribe(aircraft => {
            this.selected_aircraft = aircraft;
        })

    }

    openForm(boolValue: boolean) {
        this.newOpen = boolValue;
    }

    editForm(boolValue: boolean, index: number) {
        this.editOpen = boolValue;
        this.current_index = index
    }

    deleteForm(boolValue: boolean) {
        this.deleteOpen = boolValue;
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
        const id: number = this.aircraft_id;
        const details = {
            id,
            name,
            icon,
            textColour,
            backgroundColour,
            wind,
            precip,
            vis
        }
        console.log(details);
        this.store.dispatch(addAircraft({
            details
        }));
        this.store.dispatch(incrementId());

        console.log(this.savedAircraft)
    }


    editAircraft(
        id: number,
        name: string,
        icon: string,
        textColour: string,
        backgroundColour: string,
        wind: string,
        precip: string,
        vis: string
    ) {
        const details = {
            id,
            name,
            icon,
            textColour,
            backgroundColour,
            wind,
            precip,
            vis
        }
        this.store.dispatch(removeAircraft({ id }));
        this.store.dispatch(addAircraft({ details }));
    }

    deleteAircraft(id: number, name: string) {
        if (name === this.selected_aircraft) {
            const selected = 'None'
            this.store.dispatch(changeSelectedAircraft({ selected }))
        }
        this.store.dispatch(removeAircraft({ id }));
        this.deleteOpen = false;
        this.editOpen = false;
    }

    ngOnInit() {
        console.log(this.savedAircraft)
    }
}