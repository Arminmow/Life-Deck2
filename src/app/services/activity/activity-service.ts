import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { SupabaseService } from '../supabase/supabase.service';
import { Activity } from '../../models/activity.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService
  ) {}

  private getUserOrThrowSync() {
    const user = this.authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return user;
  }

  async getActivities() {
    const userId = this.getUserOrThrowSync().id;

    const { data, error } = await this.supabaseService.client
      .from('Activity')
      .select('*')
      .eq('userId', userId)
      .order('created', { ascending: true });

    if (error) throw error;
    return (data ?? []) as Activity[];
  }

  async addActivity(data: Activity) {
    const userId = this.getUserOrThrowSync().id;

    const { error, data: inserted } = await this.supabaseService.client
      .from('Activity')
      .insert({
        title: data.title,
        description: data.description,
        icon: data.icon,
        banner: data.banner,
        created: data.created,
        lastPlayed: data.lastPlayed,
        userId: userId,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return inserted;
  }

  async removeActivity(id: string) {
    const userId = this.getUserOrThrowSync().id;

    const { error } = await this.supabaseService.client
      .from('Activity')
      .delete()
      .eq('userId', userId)
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }

  async updateActivity(activity: Activity) {
    const userId = this.getUserOrThrowSync().id;

    const { data, error } = await this.supabaseService.client
      .from('Activity')
      .update(activity)
      .eq('id', activity.id)
      .eq('userId', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async startActivity(id: string): Promise<void> {
    const userId = this.getUserOrThrowSync().id;

    const { error: updateError } = await this.supabaseService.client
      .from('Activity')
      .update({
        lastSessionStart: new Date(),
        isRunning: true,
      })
      .eq('userId', userId)
      .eq('id', id);

    if (updateError) throw new Error(`Update failed: ${updateError.message}`);
  }

  async stopActivity(id: string) {
    const userId = this.getUserOrThrowSync().id;

    // Fetch the activity first to get lastSessionStart
    const { data: activity, error: fetchError } =
      await this.supabaseService.client
        .from('Activity')
        .select('lastSessionStart, timeSpent')
        .eq('id', id)
        .eq('userId', userId)
        .single();

    if (fetchError)
      throw new Error(`Failed to fetch activity: ${fetchError.message}`);
    if (!activity?.lastSessionStart)
      throw new Error('No session start time found.');

    const now = new Date();
    const lastStart = new Date(Date.parse(activity.lastSessionStart));
    const sessionDuration = Math.floor(
      (now.getTime() - lastStart.getTime()) / 1000
    ); // seconds

    const totalTime = (activity.timeSpent || 0) + sessionDuration;

    const { error: updateError } = await this.supabaseService.client
      .from('Activity')
      .update({
        lastSessionStart: null,
        isRunning: false,
        lastPlayed: now,
        timeSpent: totalTime,
      })
      .eq('id', id)
      .eq('userId', userId);

    if (updateError) throw new Error(`Update failed: ${updateError.message}`);
  }
}
