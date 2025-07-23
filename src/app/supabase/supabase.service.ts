import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { Activity } from '../core/stores/activity.store';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://aphguiraegrtkslgqorb.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwaGd1aXJhZWdydGtzbGdxb3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTI2ODksImV4cCI6MjA2ODUyODY4OX0.74RaCriUF5VgdrxTChCXF0epWrX3Ji7dktI19HKS2H8'
    );
  }

  get client() {
    return this.supabase;
  }

  async signInWithGoogle() {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error signing in:', error.message);
    }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) console.error('signout error :', error);
    alert('Signed out successfully');
  }

  getUser() {
    return this.supabase.auth.getUser();
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  onAuthStateChange(callback: (session: Session | null) => void) {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }

  async addActivity(data: Activity) {
    const {
      data: { user },
      error: userError,
    } = await this.supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { error, data: inserted } = await this.supabase
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

    alert('Activity added successfully!');

    return inserted;
  }

  async removeActivity(id: string) {
    const { error } = await this.supabase
      .from('Activity')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error);
      throw new Error(error.message);
    }

    alert('Activity removed successfully!');
  }

  async getActivities() {
    const {
      data: { user },
      error: userError,
    } = await this.supabase.auth.getUser();

    if (userError || !user) {
      console.error('User not found or error fetching user:', userError);
      return [];
    }

    const { data: activities, error } = await this.supabase
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
}
