import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Activity, ActivityStore, Category } from '../../stores/activity.store';
import { PrettyDurationPipe } from '../../../shared/pipes/time-spent-pipe';
import { map, Observable } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sidebar-menu',
  imports: [
    NzMenuModule,
    CommonModule,
    NzToolTipModule,
    PrettyDurationPipe,
    NzIconModule,
  ],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu implements OnInit {
  categories$!: Observable<Category[]>;

  constructor(
    public activityStore: ActivityStore,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.activityStore.loadActivities();
    this.activityStore.loadCategories();

    this.categories$ = this.activityStore.categories$;
  }

  getActivitiesByCategory(category_id: string): Observable<Activity[]> {
    return this.activityStore.activities$.pipe(
      map((activities) =>
        activities.filter((a) => a.category_id === category_id)
      )
    );
  }

  getCategoryTime(category_id: string): Observable<number> {
    return this.activityStore.activities$.pipe(
      map((acts) =>
        acts
          .filter((a) => a.category_id === category_id)
          .reduce((sum, a) => sum + (a.timeSpent || 0), 0)
      )
    );
  }

  delete(id: string) {
    this.activityStore.deleteCategoryEffect(id);
  }

  select(id: string) {
    this.activityStore.selectActivity(id);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://cdn-icons-png.flaticon.com/512/2686/2686454.png';
  }

  confirmDelete(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this category?',
      nzOkText: 'Yes, delete it',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(id),
      nzCancelText: 'Cancel',
    });
  }
}
