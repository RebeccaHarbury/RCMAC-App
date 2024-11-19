import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { DailyDetailComponent } from '../daily-detail-display/daily-detail-display.component';
import { HourlyDetailComponent } from '../hourly-detail-display/hourly-detail-display.component';
import { Title } from '@angular/platform-browser'

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
  specificLocationData: any = [];

  service = inject(AppService);

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.titleService.setTitle(`${id}`);
  }
}