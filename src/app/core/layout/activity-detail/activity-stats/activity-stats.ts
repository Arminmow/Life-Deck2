import { Component, Input } from '@angular/core';
import { Activity } from '../../../stores/activity.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivityBtn } from "../activity-btn/activity-btn";

@Component({
  selector: 'app-activity-stats',
  imports: [NzIconModule, ActivityBtn],
  templateUrl: './activity-stats.html',
  styleUrl: './activity-stats.scss',
})
export class ActivityStats {
  @Input() activity!: Activity;
}
