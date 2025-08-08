import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Activity, ActivityStore, Category } from '../../stores/activity.store';
import { PrettyDurationPipe } from '../../../shared/pipes/time-spent-pipe';
import { map, Observable } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CategoryActions } from '../category-actions/category-actions';

@Component({
  selector: 'app-sidebar-menu',
  imports: [
    NzMenuModule,
    CommonModule,
    NzToolTipModule,
    PrettyDurationPipe,
    NzIconModule,
    CategoryActions,
  ],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenu implements OnInit {
  categories$!: Observable<Category[]>;
  activitiesByCategory: { [categoryId: string]: Observable<Activity[]> } = {};
  categoryTimes: { [categoryId: string]: Observable<number> } = {};

  constructor(public activityStore: ActivityStore) {}

  ngOnInit(): void {
    this.activityStore.loadActivities();
    this.activityStore.loadCategories();

    this.categories$ = this.activityStore.categories$;

    this.categories$.subscribe((categories) => {
      for (const category of categories) {
        this.categoryTimes[category.id] = this.activityStore.activities$.pipe(
          map((acts) =>
            acts
              .filter((a) => a.category_id === category.id)
              .reduce((sum, a) => sum + (a.timeSpent || 0), 0)
          )
        );

        this.activitiesByCategory[category.id] =
          this.activityStore.activities$.pipe(
            map((activities) =>
              activities.filter((a) => a.category_id === category.id)
            )
          );
      }
    });
  }

  select(id: string) {
    this.activityStore.selectActivity(id);
  }

  trackByActivityId(index: number, activity: Activity): string {
    return activity.id;
  }

  hasActiveChild(categoryId: string): Observable<boolean> {
    return this.activitiesByCategory[categoryId].pipe(
      map((activities) => activities.some((activity) => activity.isRunning))
    );
  }
}
