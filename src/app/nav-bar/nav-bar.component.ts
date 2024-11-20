import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { setTime } from '../state/time/time.actions';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class navBarComponent implements OnInit {

    service = inject(AppService);

    reroute = this.service.boolValue;
    
  constructor(private store: Store<AppState>) { }

  onSetTime(time: number) {
    this.store.dispatch(setTime({ time }))
  }

  onSwitch() {
    this.reroute = !this.reroute;
    this.service.rerouteBool(this.reroute);
  }

  ngOnInit() {

  }
}




