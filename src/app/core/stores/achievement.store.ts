import { Inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  catchError,
  combineLatest,
  EMPTY,
  from,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { SupabaseService } from '../../supabase/supabase.service';
import { ActivityStore } from './activity.store';

export interface Achievement {
  id: string;
  title : string;
  description: string;
  created: Date;
  is_done: boolean;
  icon: string;
  activity_id: string;
}

export interface AchievementState {
  achievements: Achievement[];
}

@Injectable({ providedIn: 'root' })
export class AchievementStore extends ComponentStore<AchievementState> {
  readonly achievements$ = this.select((s) => s.achievements);
  readonly selectedAchievements$: Observable<Achievement[]>;

  constructor(
    private supabase: SupabaseService,
    private activityStore: ActivityStore
  ) {
    super({
      achievements: [],
    });

    this.loadAchievements();

    this.selectedAchievements$ = combineLatest([
      this.achievements$,
      this.activityStore.selectedActivityId$,
    ]).pipe(
      map(([all, selectedId]) =>
        selectedId ? all.filter((a) => a.activity_id === selectedId) : []
      )
    );
  }

  readonly setAchievements = this.updater<Achievement[]>(
    (state, achievements) => ({
      ...state,
      achievements,
    })
  );

  readonly loadAchievements = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        from(this.supabase.getAchievements()).pipe(
          tap({
            next: (achievements) => this.setAchievements(achievements),
            error: (err) => console.error('Error loading achievements:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
