import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Activity } from '../../../stores/activity.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivityBtn } from '../activity-btn/activity-btn';
import { CommonModule } from '@angular/common';
import { PrettyDurationPipe } from '../../../../shared/pipes/time-spent-pipe';

@Component({
  selector: 'app-activity-stats',
  imports: [NzIconModule, ActivityBtn, CommonModule, PrettyDurationPipe],
  templateUrl: './activity-stats.html',
  styleUrl: './activity-stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityStats {
  @Input() activity!: Activity;
}
