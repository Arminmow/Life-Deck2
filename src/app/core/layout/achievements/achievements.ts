import { Component, Input } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { Achievement } from '../../stores/activity.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements',
  imports: [NzProgressModule, CommonModule],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss',
})
export class Achievements {
  @Input() achievements!: Achievement[];
}
