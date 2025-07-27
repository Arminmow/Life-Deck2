import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ActivityStore } from '../../stores/activity.store';
import { PrettyDurationPipe } from '../../../shared/pipes/time-spent-pipe';
import { AchievementStore } from '../../stores/achievement.store';
import { take } from 'rxjs';

@Component({
  selector: 'app-sidebar-menu',
  imports: [NzMenuModule, CommonModule, NzToolTipModule, PrettyDurationPipe],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu implements OnInit {
  constructor(
    public activityStore: ActivityStore,
    public achievementStore: AchievementStore
  ) {}

  ngOnInit(): void {
    this.activityStore.loadActivities();
    this.achievementStore.loadAchievements();

    
  }

  select(id: string) {
    this.activityStore.selectActivity(id);

     this.achievementStore.selectedAchievements$
    .pipe(take(1))                    // only need the current value
    .subscribe((achs) => {
      console.log('🏹 Selected achievements for', id, achs);
    });
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://cdn-icons-png.flaticon.com/512/2686/2686454.png';
  }
}
