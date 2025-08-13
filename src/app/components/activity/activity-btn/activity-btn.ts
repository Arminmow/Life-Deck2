import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ActivityStore } from '../../../stores/activity/activity.store';

@Component({
  selector: 'app-activity-btn',
  imports: [NzButtonModule, NzIconModule , CommonModule],
  templateUrl: './activity-btn.html',
  styleUrl: './activity-btn.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityBtn {
  @Input() activityId!: string;
  @Input() isRunning: boolean = false;
  loading: boolean = false;

  constructor(private activityStore: ActivityStore) {}

  async handleClick() {
    this.loading = true;
    try {
      if (this.isRunning) {
        await this.activityStore.stopActivityEffect(this.activityId);
      } else {
        await this.activityStore.startActivityEffect(this.activityId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
