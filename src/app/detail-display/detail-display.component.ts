import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser'
import { DailyDetailComponent } from '../daily-detail-display/daily-detail-display.component';
import { HourlyDetailComponent } from '../hourly-detail-display/hourly-detail-display.component';

@Component({
  selector: 'detail-display-component',
  standalone: true,
  templateUrl: './detail-display.component.html',
  imports: [
    CommonModule,
    DailyDetailComponent,
    HourlyDetailComponent
  ],
  styleUrl: './detail-display.component.scss'
})

export class DetailDisplayComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.titleService.setTitle(`${id}`);
  }
}