import { Component, Input } from '@angular/core';
import { Activity } from '../../stores/activity.store';
import { CommonModule } from '@angular/common';
import { ActivityStats } from './activity-stats/activity-stats';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivityActions } from "./activity-actions/activity-actions";
import { Achievements } from "../achievements/achievements";

@Component({
  selector: 'app-activity-detail',
  imports: [CommonModule, ActivityStats, NzButtonModule, NzIconModule, ActivityActions, Achievements],
  templateUrl: './activity-detail.html',
  styleUrl: './activity-detail.scss',
})
export class ActivityDetail {
  @Input() activity!: Activity | null;
}
