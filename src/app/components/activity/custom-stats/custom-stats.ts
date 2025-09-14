import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ActivityStore } from '../../../stores/activity/activity.store';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-custom-stats',
  imports: [
    NzCardModule,
    CommonModule,
    NzButtonModule,
    NzPopoverModule,
    NzFormModule,
    NzInputNumberModule,
  ],
  templateUrl: './custom-stats.html',
  styleUrl: './custom-stats.scss',
})
export class CustomStats {
  constructor(public activityStore: ActivityStore) {
    activityStore.selectedActivity$.subscribe((ac) => {
      console.log(ac?.customStats);
    });
  }

  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }
}
