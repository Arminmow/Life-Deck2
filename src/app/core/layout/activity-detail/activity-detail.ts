import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Activity } from '../../stores/activity.store';
import { CommonModule } from '@angular/common';
import { ActivityStats } from './activity-stats/activity-stats';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivityActions } from './activity-actions/activity-actions';
import { ActivityModal } from "../../../shared/modals/activity-modal/activity-modal";

@Component({
  selector: 'app-activity-detail',
  imports: [
    CommonModule,
    ActivityStats,
    NzButtonModule,
    NzIconModule,
    ActivityActions,
    ActivityModal
],
  templateUrl: './activity-detail.html',
  styleUrl: './activity-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityDetail {
  @Input() activity!: Activity | null;
}
