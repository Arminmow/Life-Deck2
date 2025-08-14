import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Activity } from '../../models/activity.model';

export interface ActivityState {
  activities: Activity[];
  selectedActivityId: string | null;
}

@Injectable({ providedIn: 'root' })
export class ActivityStore extends ComponentStore<ActivityState> {
  constructor() {
    super({
      activities: [],
      selectedActivityId: localStorage.getItem('activeId') ?? null,
    });
  }

  //selectors
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

  //updaters
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

  readonly updateActivity = this.updater<Activity>((state, activity) => {
    return {
      ...state,
      activities: state.activities.map((a) =>
        a.id === activity.id ? { ...activity } : a
      ),
    };
  });
}
