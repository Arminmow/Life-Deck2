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
  lastPlayed: Date;
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
}
