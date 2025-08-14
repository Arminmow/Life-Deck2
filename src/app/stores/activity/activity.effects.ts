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

  readonly addActivityEffect = this.activityStore.effect<Activity>(
    (activity$) =>
      activity$.pipe(
        switchMap((activity) =>
          from(this.activityService.addActivity(activity)).pipe(
            tap({
              next: (activity) => {
                this.activityStore.addActivity(activity);
                this.notification.success('', 'Activity Added successfully');
              },
              error: (err) => console.error('Error adding activities:', err),
            }),
            catchError(() => EMPTY)
          )
        )
      )
  );

  // I NEED TO ASK A PRO ⬇️⬇️⬇️

  // readonly addActivityEffect = async (newActivity: Activity): Promise<void> => {
  //   try {
  //     const insertedActivity = await this.activityService.addActivity(
  //       newActivity
  //     );
  //     this.activityStore.addActivity(insertedActivity);
  //     this.notification.success('', 'Activity Added successfully');
  //   } catch (error) {
  //     console.error('Failed to add activity to backend:', error);
  //   }
  // };

  readonly removeActivityEffect = this.activityStore.effect<string>(
    (activityId$) =>
      activityId$.pipe(
        switchMap((activityId) =>
          from(this.activityService.removeActivity(activityId)).pipe(
            tap({
              next: () => {
                this.activityStore.removeActivity(activityId);
                this.notification.success('', 'Activity Deleted successfully');
              },
              error: (err) => console.error('Error adding activities:', err),
            }),
            catchError(() => EMPTY)
          )
        )
      )
  );

  readonly startActivityEffect = this.activityStore.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        from(this.activityService.startActivity(id)).pipe(
          tap({
            next: () => {
              this.activityStore.startActivity(id);
              this.notification.success('', 'Activity Started successfully');
            },
            error: (err) => console.error('Error starting activity:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly stopActivityEffect = this.activityStore.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        from(this.activityService.stopActivity(id)).pipe(
          tap({
            next: () => {
              this.activityStore.stopActivity(id);
              this.notification.success('', 'Activity Stopped successfully');
            },
            error: (err) => console.error('Error stopping activity:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly updateActivityEffect = this.activityStore.effect<Activity>(
    (activity$) =>
      activity$.pipe(
        switchMap((activity) =>
          from(this.activityService.updateActivity(activity)).pipe(
            tap({
              next: (activity) => {
                this.activityStore.updateActivity(activity);
                this.notification.success('', 'Activity Updated successfully');
              },
              error: (err) => console.error('Error updating activity:', err),
            }),
            catchError(() => EMPTY)
          )
        )
      )
  );

  readonly addActivitiesToCategoryEffect = this.activityStore.effect<{
    categoryId: string;
    activityIds: string[];
  }>((data$) =>
    data$.pipe(
      switchMap(({ categoryId, activityIds }) =>
        from(
          this.categoryService.addActivitiesToCategory(activityIds, categoryId)
        ).pipe(
          tap({
            next: () => {
              this.activityStore.addActivityToCategory({
                activityIds,
                categoryId,
              });
              this.notification.success(
                '',
                'Activities Added To Category Successfully'
              );
            },
            error: (err) =>
              console.error('Error adding activities to category:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly removeActivitiesFromCategoryEffect = this.activityStore.effect<
    string[]
  >((activityIds$) =>
    activityIds$.pipe(
      switchMap((activityIds) =>
        from(
          this.categoryService.removeActivitiesFromCategory(activityIds)
        ).pipe(
          tap({
            next: () => {
              this.activityStore.removeActivitiesFromCategory({ activityIds });
              this.notification.success('', 'Activity Removed successfully');
            },
            error: (err) =>
              console.error('Error removing activities from category:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
