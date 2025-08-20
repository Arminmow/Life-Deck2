import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ActivityBtn } from '../activity-btn/activity-btn';
import { TimeSpent } from '../../../pipes/time-spent/time-spent-pipe';
import { Activity } from '../../../models/activity.model';
import { TimeAgoPipe } from '../../../pipes/timeAgo/time-ago-pipe';

@Component({
  selector: 'app-activity-stats',
  imports: [NzIconModule, ActivityBtn, CommonModule, TimeSpent , TimeAgoPipe],
  templateUrl: './activity-stats.html',
  styleUrl: './activity-stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityStats {
  @Input() activity!: Activity;
}
