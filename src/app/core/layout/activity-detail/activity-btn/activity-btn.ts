import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivityStore } from '../../../stores/activity.store';

@Component({
  selector: 'app-activity-btn',
  imports: [NzButtonModule, NzIconModule],
  templateUrl: './activity-btn.html',
  styleUrl: './activity-btn.scss',
})
export class ActivityBtn {
  @Input() activityId!: string;
  @Input() isRunning: boolean = false;

  constructor(private activityStore: ActivityStore) {}

  startActivity() {
    console.log('starting...');
    
    this.activityStore.startActivityEffect(this.activityId);
  }
}
