import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from './services/app.service';
import { navbarComponent } from "./nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, navbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'Devon RC Model Aircraft Club';

  service = inject(AppService);

  constructor() { }

  home() {
    this.service.cancelReroute(true);
  }

  ngOnInit() {
    this.service.loadHourlyData();
    this.service.loadDailyData();
    console.log('app component on init');
  }
}


