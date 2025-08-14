import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, from, switchMap, tap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivityService } from '../../services/activity/activity-service';
import { CategoryService } from '../../services/category/category-service';
import { Activity } from '../../models/activity.model';
import { Category } from '../../models/category.model';
import { CategoryStore } from '../category/category.store';



export interface ActivityState {
  activities: Activity[];
  categories: Category[];
  selectedActivityId: string | null;
}

@Injectable({ providedIn: 'root' })
export class ActivityStore extends ComponentStore<ActivityState> {
  constructor(
    private notification: NzNotificationService,
    private activityService: ActivityService,
    private categoryService: CategoryService,
    private categoryStore : CategoryStore
  ) {
    super({
      activities: [],
      categories: [],
      selectedActivityId: localStorage.getItem('activeId') ?? null,
    });
  }

  readonly activities$ = this.select((state) => state.activities);

  readonly selectedActivityId$ = this.select(
    (state) => state.selectedActivityId
  );

  readonly selectedActivity$ = this.select(
    this.activities$,
    this.selectedActivityId$,
    (activities, selectedId) =>
      activities.find((a) => a.id === selectedId) || null
  );

  readonly unassignedActivities$ = this.select(this.activities$, (activities) =>
    activities.filter((a) => !a.category_id)
  );

  readonly startActivity = this.updater<string>((state, id) => {
    return {
      ...state,
      activities: state.activities.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              lastSessionStart: new Date(),
              isRunning: true,
            }
          : activity
      ),
    };
  });

  readonly stopActivity = this.updater<string>((state, id) => {
    const now = new Date();

    return {
      ...state,
      activities: state.activities.map((activity) => {
        if (activity.id !== id) return activity;

        if (!activity.lastSessionStart) return activity;

        const lastStart = new Date(activity.lastSessionStart);
        const timeSpentInSeconds = Math.floor(
          (now.getTime() - lastStart.getTime()) / 1000
        );
        const totalTimeSpent = (activity.timeSpent || 0) + timeSpentInSeconds;

        return {
          ...activity,
          lastSessionStart: null,
          isRunning: false,
          timeSpent: totalTimeSpent,
          lastPlayed: now,
        };
      }),
    };
  });

  readonly addActivity = this.updater<Activity>((state, activity) => ({
    ...state,
    activities: [...state.activities, activity],
  }));

  readonly addActivityToCategory = this.updater<{
    activityIds: string[];
    categoryId: string;
  }>((state, { activityIds, categoryId }) => {
    const updatedActivities = state.activities.map((activity) =>
      activityIds.includes(activity.id)
        ? { ...activity, category_id: categoryId }
        : activity
    );

    return {
      ...state,
      activities: updatedActivities,
    };
  });

  readonly removeActivitiesFromCategory = this.updater<{
    activityIds: string[];
  }>((state, { activityIds }) => {
    const updatedActivities = state.activities.map((activity) =>
      activityIds.includes(activity.id)
        ? { ...activity, category_id: null }
        : activity
    );

    return {
      ...state,
      activities: updatedActivities,
    };
  });

  readonly removeActivity = this.updater<string>((state, id) => ({
    ...state,
    activities: state.activities.filter((a) => a.id !== id),
  }));

  readonly selectActivity = this.updater<string | null>((state, id) => {
    localStorage.setItem('activeId', id ?? '');
    return {
      ...state,
      selectedActivityId: id,
    };
  });

  readonly unassignActivities = this.updater<Activity[]>(
    (state, activitiesToUnassign) => {
      const idsToUnassign = activitiesToUnassign.map((a) => a.id);

      const updatedActivities = state.activities.map((activity) =>
        idsToUnassign.includes(activity.id)
          ? { ...activity, category_id: null }
          : activity
      );

      return {
        ...state,
        activities: updatedActivities,
      };
    }
  );

  readonly setActivities = this.updater<Activity[]>((state, activities) => ({
    ...state,
    activities,
  }));

  readonly loadActivities = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        from(this.activityService.getActivities()).pipe(
          tap({
            next: (activities) => this.setActivities(activities),
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
      this.addActivity(insertedActivity);
      this.notification.success('', 'Activity Added successfully');
    } catch (error) {
      console.error('Failed to add activity to backend:', error);
    }
  };

  readonly removeActivityEffect = async (activityId: string): Promise<void> => {
    try {
      await this.activityService.removeActivity(activityId);
      this.removeActivity(activityId);
      this.notification.success('', 'Activity Deleted successfully');
    } catch (error) {
      console.error('Failed to delete activity:', error);
    }
  };

  readonly updateActivity = this.updater<Activity>((state, activity) => {
    return {
      ...state,
      activities: state.activities.map((a) =>
        a.id === activity.id ? { ...activity } : a
      ),
    };
  });

  readonly startActivityEffect = async (id: string): Promise<void> => {
    try {
      await this.activityService.startActivity(id);
      this.startActivity(id);
      this.notification.success('', 'Activity Started successfully');
    } catch (error) {
      console.error('Failed to start activity:', error);
      this.notification.error('Failed to start activity', `${error}`);
    }
  };

  readonly stopActivityEffect = async (id: string): Promise<void> => {
    try {
      await this.activityService.stopActivity(id);
      this.stopActivity(id);
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
      this.updateActivity(updatedActivity);
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

      this.addActivityToCategory({ activityIds, categoryId });
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

      this.removeActivitiesFromCategory({ activityIds });
      this.notification.success('', 'Activity Removed successfully');
    } catch (error) {
      console.error('Failed to remove activity from category', `${error}`);
    }
  };

}
