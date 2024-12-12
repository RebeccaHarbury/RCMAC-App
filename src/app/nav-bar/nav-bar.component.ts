import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from '../services/app.service';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class navbarComponent implements OnInit {

  appService = inject(AppService);

  reroute = this.appService.boolValue;

  constructor() { }

  home() {
    this.appService.cancelReroute(true);
  }

  onSwitch() {
    this.reroute = !this.reroute;
    this.appService.rerouteBool(this.reroute);
  }

  ngOnInit() {
  }
}




