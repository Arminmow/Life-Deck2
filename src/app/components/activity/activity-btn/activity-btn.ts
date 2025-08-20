import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../../services/activity/activity-service';
import { ActivityStore } from '../../../stores/activity/activity.store';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-activity-btn',
  imports: [NzButtonModule, NzIconModule, CommonModule],
  templateUrl: './activity-btn.html',
  styleUrl: './activity-btn.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityBtn {
  @Input() activityId!: string;
  @Input() isRunning: boolean = false;
  loading: boolean = false;

  constructor(
    private activityService: ActivityService,
    private activityStore: ActivityStore,
    private notification: NzNotificationService
  ) {}

  async handleClick() {
    if (this.loading) return;
    this.loading = true;
    try {
      if (this.isRunning) {
        await this.activityService.stopActivity(this.activityId); // Promise<Activity>
        this.activityStore.stopActivity(this.activityId); // local updater to update state
        this.notification.success('', 'Activity Stopped successfully');
      } else {
        await this.activityService.startActivity(this.activityId); // Promise<Activity>
        this.activityStore.startActivity(this.activityId);
        this.notification.success('', 'Activity Started successfully');
      }
    } catch (err) {
      // show toast via notification service or parent
      this.notification.error('', 'Failed To Stop Activity');
    } finally {
      this.loading = false;
    }
  }
}
