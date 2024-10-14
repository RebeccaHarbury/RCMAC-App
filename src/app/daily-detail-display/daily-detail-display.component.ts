import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'daily-detail-display',
  standalone: true,
  templateUrl: './daily-detail-display.component.html',
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    DatePipe,
  ],
  styleUrl: './daily-detail-display.component.scss'
})
export class DailyDetailComponent implements OnInit {
  specificLocationData: any = [];

  service = inject(AppService);
  constructor(
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.specificLocationData.push(
      this.service.getData(id));
    console.log('daily display on init:', this.specificLocationData);

  }
}