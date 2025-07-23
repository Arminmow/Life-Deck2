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
}

export interface ActivityState {
  activities: Activity[];
  selectedActivityId: string | null;
}

@Injectable({ providedIn: 'root' })
export class ActivityStore extends ComponentStore<ActivityState> {
  constructor(private supabaseService: SupabaseService) {
    super({
      activities: [],
      selectedActivityId: null,
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

  readonly addActivity = this.updater<Activity>((state, activity) => ({
    ...state,
    activities: [...state.activities, activity],
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
}
