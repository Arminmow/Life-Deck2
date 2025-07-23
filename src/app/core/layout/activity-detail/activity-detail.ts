import { Component, Input } from '@angular/core';
import { Activity } from '../../stores/activity.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-detail',
  imports: [CommonModule],
  templateUrl: './activity-detail.html',
  styleUrl: './activity-detail.scss',
})
export class ActivityDetail {
  @Input() activity!: Activity | null;
}
