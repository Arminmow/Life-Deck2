import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SupabaseService } from '../../supabase/supabase.service';
import { catchError, EMPTY, from, switchMap, tap } from 'rxjs';

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  banner: string;
  created: Date;
  lastPlayed: Date | null;
  lastSessionStart: Date | null;
  isRunning: boolean;
  timeSpent: number | null;
  category_id: string | null;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
}

export interface ActivityState {
  activities: Activity[];
  categories: Category[];
  selectedActivityId: string | null;
}

@Injectable({ providedIn: 'root' })
export class ActivityStore extends ComponentStore<ActivityState> {
  constructor(private supabaseService: SupabaseService) {
    super({
      activities: [],
      categories: [],
      selectedActivityId: null,
    });
  }

  readonly activities$ = this.select((state) => state.activities);

  readonly categories$ = this.select((state) => state.categories);

  readonly setCategories = this.updater<Category[]>((state, categories) => ({
    ...state,
    categories,
  }));

  readonly selectedActivityId$ = this.select(
    (state) => state.selectedActivityId
  );

  readonly selectedActivity$ = this.select(
    this.activities$,
    this.selectedActivityId$,
    (activities, selectedId) =>
      activities.find((a) => a.id === selectedId) || null
  );

  readonly startActivity = this.updater<string>((state, id) => {
    const activity = state.activities.find((a) => a.id === id);
    if (activity) {
      activity.lastSessionStart = new Date();
      activity.isRunning = true;
    }
    return { ...state };
  });

  readonly stopActivity = this.updater<string>((state, id) => {
    const activity = state.activities.find((a) => a.id === id);
    const now = new Date();

    if (activity && activity.lastSessionStart) {
      const lastStart = new Date(activity.lastSessionStart);
      const timeSpentInSeconds = Math.floor(
        (now.getTime() - lastStart.getTime()) / 1000
      );
      const totalTimeSpent = (activity.timeSpent || 0) + timeSpentInSeconds;

      activity.lastSessionStart = null;
      activity.isRunning = false;
      activity.timeSpent = totalTimeSpent;
      activity.lastPlayed = now;
    }
    return { ...state };
  });

  readonly addActivity = this.updater<Activity>((state, activity) => ({
    ...state,
    activities: [...state.activities, activity],
  }));

  readonly addCategory = this.updater<Category>((state, category) => ({
    ...state,
    categories: [...state.categories, category],
  }));

  readonly removeActivity = this.updater<string>((state, id) => ({
    ...state,
    activities: state.activities.filter((a) => a.id !== id),
  }));

  readonly selectActivity = this.updater<string | null>((state, id) => ({
    ...state,
    selectedActivityId: id,
  }));

  readonly setActivities = this.updater<Activity[]>((state, activities) => ({
    ...state,
    activities,
  }));

  readonly loadActivities = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        from(this.supabaseService.getActivities()).pipe(
          tap({
            next: (activities) => this.setActivities(activities),
            error: (err) => console.error('Error loading activities:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly addActivityEffect = this.effect<Activity>((newActivity$) =>
    newActivity$.pipe(
      // First add activity locally
      tap((newActivity) => this.addActivity(newActivity)),

      // Then call Supabase to add to backend
      switchMap((newActivity) =>
        this.supabaseService.addActivity(newActivity).then(
          (insertedActivity) => {
            // Optionally replace local temp activity with server response (like new ID)
          },
          (error) => {
            // Rollback if backend call fails
            this.removeActivity(newActivity.id);
            console.error('Failed to add activity to backend:', error);
          }
        )
      )
    )
  );

  //This needs to be studied fully + the best practices
  readonly removeActivityEffect = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.supabaseService.removeActivity(id).then(
          () => {
            this.removeActivity(id);
          },
          (error) => {
            console.error('Failed to remove activity from backend:', error);
          }
        )
      )
    )
  );

  readonly updateActivity = this.updater<Activity>((state, activity) => {
    return {
      ...state,
      activities: state.activities.map((a) =>
        a.id === activity.id ? { ...activity } : a
      ),
    };
  });

  readonly startActivityEffect = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.supabaseService.startActivity(id).then(
          () => {
            this.startActivity(id);
          },
          (error) => {
            console.error('Failed to start activity:', error);
          }
        )
      )
    )
  );

  readonly stopActivityEffect = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.supabaseService.stopActivity(id).then(
          () => {
            this.stopActivity(id);
          },
          (error) => {
            console.error('Failed to stop activity:', error);
          }
        )
      )
    )
  );

  readonly updateActivityEffect = this.effect<Activity>((activity$) =>
    activity$.pipe(
      switchMap((activity) =>
        this.supabaseService.updateActivity(activity).then(
          () => {
            this.updateActivity(activity);
          },
          (error) => {
            console.error('Failed to update activity:', error);
          }
        )
      )
    )
  );

  readonly loadCategories = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        from(this.supabaseService.getCategories()).pipe(
          tap({
            next: (categories) => this.setCategories(categories),
            error: (err) => console.error('Error loading categories:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly addCategoryEffect = this.effect<Category>((cat$) =>
    cat$.pipe(
      switchMap((category) =>
        from(this.supabaseService.addCategory(category)).pipe(
          tap({
            next: (category) => this.addCategory(category),
            error: (err) => console.error('Failed to add category:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
