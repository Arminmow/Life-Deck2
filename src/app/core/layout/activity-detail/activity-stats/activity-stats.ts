import { Component, Input } from '@angular/core';
import { Activity } from '../../../stores/activity.store';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-activity-stats',
  imports: [NzIconModule],
  templateUrl: './activity-stats.html',
  styleUrl: './activity-stats.scss',
})
export class ActivityStats {
  @Input() activity!: Activity;
}
