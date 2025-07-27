import { Component, Input } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { CommonModule } from '@angular/common';
import { AchievementModal } from '../../../shared/modals/achievement-modal/achievement-modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Achievement, AchievementStore } from '../../stores/achievement.store';

@Component({
  selector: 'app-achievements',
  imports: [NzProgressModule, CommonModule, AchievementModal, NzIconModule],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss',
})
export class Achievements {

  constructor(public achievementStore: AchievementStore) {}
}
