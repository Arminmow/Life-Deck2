import { inject, Injectable } from '@angular/core';
import { ActivityStore } from './activity.store';
import { catchError, EMPTY, from, switchMap, tap } from 'rxjs';
import { ActivityService } from '../../services/activity/activity-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Activity } from '../../models/activity.model';
import { CategoryService } from '../../services/category/category-service';

@Injectable({ providedIn: 'root' })
export class ActivityEffects {
  private readonly activityStore = inject(ActivityStore);
  private readonly activityService = inject(ActivityService);
  private readonly notification = inject(NzNotificationService);
  private readonly categoryService = inject(CategoryService);

  readonly loadActivities = this.activityStore.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        from(this.activityService.getActivities()).pipe(
          tap({
            next: (activities) => this.activityStore.setActivities(activities),
            error: (err) => console.error('Error loading activities:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly addActivityEffect = async (newActivity: Activity): Promise<void> => {
    try {
      const insertedActivity = await this.activityService.addActivity(
        newActivity
      );
      this.activityStore.addActivity(insertedActivity);
      this.notification.success('', 'Activity Added successfully');
    } catch (error) {
      console.error('Failed to add activity to backend:', error);
    }
  };

  readonly removeActivityEffect = async (activityId: string): Promise<void> => {
    try {
      await this.activityService.removeActivity(activityId);
      this.activityStore.removeActivity(activityId);
      this.notification.success('', 'Activity Deleted successfully');
    } catch (error) {
      console.error('Failed to delete activity:', error);
    }
  };

  readonly startActivityEffect = async (id: string): Promise<void> => {
    try {
      await this.activityService.startActivity(id);
      this.activityStore.startActivity(id);
      this.notification.success('', 'Activity Started successfully');
    } catch (error) {
      console.error('Failed to start activity:', error);
      this.notification.error('Failed to start activity', `${error}`);
    }
  };

  readonly stopActivityEffect = async (id: string): Promise<void> => {
    try {
      await this.activityService.stopActivity(id);
      this.activityStore.stopActivity(id);
      this.notification.success('', 'Activity Stopped successfully');
    } catch (error) {
      console.error('Failed to stop activity:', error);
      this.notification.error('Failed to stop activity', `${error}`);
    }
  };

  readonly updateActivityEffect = async (activity: Activity) => {
    try {
      const updatedActivity = await this.activityService.updateActivity(
        activity
      );
      this.activityStore.updateActivity(updatedActivity);
      this.notification.success('', 'Activity Updated successfully');
    } catch (error) {
      console.error('Failed to update activity:', error);
    }
  };

  readonly addActivitiesToCategoryEffect = async (
    categoryId: string,
    activityIds: string[]
  ): Promise<void> => {
    try {
      await this.categoryService.addActivitiesToCategory(
        activityIds,
        categoryId
      );

      this.activityStore.addActivityToCategory({ activityIds, categoryId });
      this.notification.success(
        '',
        'Activities Added To Category Successfully'
      );
    } catch (error) {
      console.error('Failed to add activities to category:', error);
    }
  };

  readonly removeActivitiesFromCategoryEffect = async (
    activityIds: string[]
  ) => {
    try {
      await this.categoryService.removeActivitiesFromCategory(activityIds);

      this.activityStore.removeActivitiesFromCategory({ activityIds });
      this.notification.success('', 'Activity Removed successfully');
    } catch (error) {
      console.error('Failed to remove activity from category', `${error}`);
    }
  };
}
