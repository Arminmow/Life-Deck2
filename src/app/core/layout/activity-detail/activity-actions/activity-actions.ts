import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Activity, ActivityStore } from '../../../stores/activity.store';

@Component({
  selector: 'app-activity-actions',
  imports: [NzIconModule, NzButtonModule],
  templateUrl: './activity-actions.html',
  styleUrl: './activity-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityActions {
  constructor(private activityStore: ActivityStore) {}

  @Input() activity!: Activity;

  delete() {
    this.activityStore.removeActivityEffect(this.activity.id);
  }
}
