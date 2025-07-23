import { Component, Input } from '@angular/core';
import { Activity } from '../../stores/activity.store';
import { CommonModule } from '@angular/common';
import { ActivityStats } from "./activity-stats/activity-stats";

@Component({
  selector: 'app-activity-detail',
  imports: [CommonModule, ActivityStats],
  templateUrl: './activity-detail.html',
  styleUrl: './activity-detail.scss',
})
export class ActivityDetail {
  @Input() activity!: Activity | null;
}
