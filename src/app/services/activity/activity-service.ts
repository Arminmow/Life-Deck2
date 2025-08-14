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

  async getActivities() {
    const {
      data: { user },
      error: userError,
    } = await this.authService.getUser();

    if (userError || !user) {
      console.error('User not found or error fetching user:', userError);
      return [];
    }

    const { data: activities, error } = await this.supabaseService.client
      .from('Activity')
      .select('*')
      .eq('userId', user.id)
      .order('created', { ascending: true });

    if (error) {
      console.error('Failed to fetch activities:', error.message);
      return [];
    }

    return activities;
  }

  async addActivity(data: Activity) {
    const {
      data: { user },
      error: userError,
    } = await this.authService.getUser();

    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { error, data: inserted } = await this.supabaseService.client
      .from('Activity')
      .insert({
        title: data.title,
        description: data.description,
        icon: data.icon,
        banner: data.banner,
        created: data.created,
        lastPlayed: data.lastPlayed,
        userId: user.id,
      })
      .select()
      .single();

    if (error) {
      alert(error);
      throw new Error(error.message);
    }

    return inserted;
  }

  async removeActivity(id: string) {
    const { error } = await this.supabaseService.client
      .from('Activity')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error);
      throw new Error(error.message);
    }
  }

  async updateActivity(activity: Activity) {
    const { data, error } = await this.supabaseService.client
      .from('Activity')
      .update(activity)
      .eq('id', activity.id)
      .select()
      .single();

    if (error) {
      alert(error);
      throw new Error(error.message);
    }

    return data;
  }

  async startActivity(id: string): Promise<void> {
    try {
      const {
        data: { user },
        error: userError,
      } = await this.authService.getUser();

      if (userError) throw new Error(`Auth error: ${userError.message}`);
      if (!user) throw new Error('User is not authenticated.');

      const { error: updateError } = await this.supabaseService.client
        .from('Activity')
        .update({
          lastSessionStart: new Date(),
          isRunning: true,
        })
        .eq('id', id);

      if (updateError) throw new Error(`Update failed: ${updateError.message}`);
    } catch (err: any) {
      console.error('Failed to start activity:', err);
      alert(`Failed to start activity: ${err.message || err}`);
    }
  }

  async stopActivity(id: string) {
    try {
      const {
        data: { user },
        error: userError,
      } = await this.authService.getUser();

      if (userError) throw new Error(`Auth error: ${userError.message}`);
      if (!user) throw new Error('User is not authenticated.');

      // Fetch the activity first to get lastSessionStart
      const { data: activity, error: fetchError } = await this.supabaseService.client
        .from('Activity')
        .select('lastSessionStart, timeSpent')
        .eq('id', id)
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
        .eq('id', id);

      if (updateError) throw new Error(`Update failed: ${updateError.message}`);
    } catch (err: any) {
      console.error('Failed to stop activity:', err);
      alert(`Failed to stop activity: ${err.message || err}`);
    }
  }
}
