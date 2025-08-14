import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { Activity, Category } from '../../stores/activity/activity.store';

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

  async getCategories() {
    const {
      data: { user },
      error: userError,
    } = await this.supabase.auth.getUser();

    if (userError || !user) {
      console.error('User not authenticated:', userError);
      return [];
    }

    const { data, error } = await this.supabase
      .from('category')
      .select('*')
      .eq('user_id', user.id)
      .order('title', { ascending: true });
    if (error) {
      console.error('Failed to fetch categories:', error.message);
      return [];
    }
    return data;
  }

  async addCategory(newCategory: Category & { activities: string[] }) {
    const {
      data: { user },
      error: userError,
    } = await this.supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await this.supabase
      .from('category')
      .insert([
        {
          title: newCategory.title,
          icon: newCategory.icon,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      alert(error.message);
      throw new Error(error.message);
    }

    try {
      if (newCategory.activities?.length) {
        await this.addActivitiesToCategory(newCategory.activities, data.id);
      }
    } catch (linkError) {
      await this.supabase.from('category').delete().eq('id', data.id);
      alert('Failed to link activities, category rolled back.');
      throw linkError;
    }

    return data;
  }

  async removeActivitiesFromCategory(activities: string[]) {
    const {
      data: { user },
      error: userError,
    } = await this.supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { error } = await this.supabase
      .from('Activity')
      .update({ category_id: null })
      .in('id', activities)
      .eq('userId', user.id);

    if (error) {
      console.error('Failed to remove activities from category:', error);
      alert(error);
      throw new Error(error.message);
    }

  }

  async addActivitiesToCategory(activities: string[], categoryId: string) {
    const {
      data: { user },
      error: userError,
    } = await this.supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { error } = await this.supabase
      .from('Activity')
      .update({ category_id: categoryId })
      .in('id', activities)
      .eq('userId', user.id); 

    if (error) {
      console.error('Failed to add activities to category:', error);
      alert(error);
      throw new Error(error.message);
    }

  }

  async deleteCategory(categoryId: string) {
    const {
      data: { user },
      error: userError,
    } = await this.supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data: unassignedActivities, error: unassignError } =
      await this.supabase
        .from('Activity')
        .update({ category_id: null })
        .eq('category_id', categoryId)
        .eq('userId', user.id)
        .select();

    if (unassignError) {
      alert(unassignError.message);
      throw new Error(unassignError.message);
    }

    const { error: deleteError } = await this.supabase
      .from('category')
      .delete()
      .eq('id', categoryId)
      .eq('user_id', user.id);

    if (deleteError) {
      alert(deleteError.message);
      throw new Error(deleteError.message);
    }

    return unassignedActivities;
  }

  async updateCategory(categoryId: string, updatedData: Category) {
    const {
      data: { user },
      error: userError,
    } = await this.supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { error } = await this.supabase
      .from('category')
      .update(updatedData)
      .eq('id', categoryId)
      .eq('user_id', user.id);

    if (error) {
      alert(error.message);
      throw new Error(error.message);
    }

  }
}
