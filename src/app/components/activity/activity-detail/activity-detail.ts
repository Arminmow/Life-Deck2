import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityStats } from '../../../components/activity/activity-stats/activity-stats';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivityModal } from "../../../shared/modals/activity-modal/activity-modal";
import { ActivityActions } from '../../../components/activity/activity-actions/activity-actions';
import { Activity } from '../../../models/activity.model';

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
