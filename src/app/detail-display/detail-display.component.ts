import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-display',
  standalone: true,
  templateUrl: './detail-display.component.html',
  imports: [
    CommonModule,
    DatePipe
  ],
  styleUrl: './detail-display.component.scss'
})
export class DetailDisplayComponent {
  constructor() {
  }
  @Input() place = '';
  @Input() date = '';
  @Input() icon = '';
  @Input() up = '';
  @Input() down = '';
  @Input() temperature = '';
  @Input() highTemperature = '';
  @Input() lowTemperature = '';
  @Input() win = '';
  @Input() precip = '';
  @Input() vis = '';
  @Input() wind = '';
  @Input() precipitation = '';
  @Input() visibility = '';

}
