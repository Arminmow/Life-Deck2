import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Activity, ActivityStore, Category } from '../../stores/activity.store';
import { PrettyDurationPipe } from '../../../shared/pipes/time-spent-pipe';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar-menu',
  imports: [NzMenuModule, CommonModule, NzToolTipModule, PrettyDurationPipe],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu implements OnInit {
  categories$!: Observable<Category[]>;

  uncategorizedActivities$!: Observable<Activity[]>;

  constructor(public activityStore: ActivityStore) {}

  ngOnInit(): void {
    this.activityStore.loadActivities();
    this.activityStore.loadCategories();

    this.categories$ = this.activityStore.categories$;

    this.uncategorizedActivities$ = this.activityStore.activities$.pipe(
      map((activities) => activities.filter((a) => !a.category_id))
    );
  }

  getActivitiesByCategory(category_id: string): Observable<Activity[]> {
    return this.activityStore.activities$.pipe(
      map((activities) =>
        activities.filter((a) => a.category_id === category_id)
      )
    );
  }

  select(id: string) {
    this.activityStore.selectActivity(id);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://cdn-icons-png.flaticon.com/512/2686/2686454.png';
  }
}
