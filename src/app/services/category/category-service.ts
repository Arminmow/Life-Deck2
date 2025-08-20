import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthService } from '../auth/auth-service';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {}

  private getUserOrThrowSync() {
    const user = this.authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return user;
  }

  async getCategories() {
    const userId = this.getUserOrThrowSync().id;

    const { data, error } = await this.supabaseService.client
      .from('category')
      .select('*')
      .eq('user_id', userId)
      .order('title', { ascending: true });
    if (error) {
      console.error('Failed to fetch categories:', error.message);
      return [];
    }
    return data;
  }

  async addCategory(newCategory: Category & { activities: string[] }) {
    const userId = this.getUserOrThrowSync().id;

    const { data, error } = await this.supabaseService.client
      .from('category')
      .insert([
        {
          title: newCategory.title,
          icon: newCategory.icon,
          user_id: userId,
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
      await this.supabaseService.client
        .from('category')
        .delete()
        .eq('id', data.id)
        .eq('user_id', userId);
      alert('Failed to link activities, category rolled back.');
      throw linkError;
    }

    return data;
  }

  async addActivitiesToCategory(activities: string[], categoryId: string) {
    const userId = this.getUserOrThrowSync().id;
    const { error } = await this.supabaseService.client
      .from('Activity')
      .update({ category_id: categoryId })
      .in('id', activities)
      .eq('userId', userId);

    if (error) {
      console.error('Failed to add activities to category:', error);
      alert(error);
      throw new Error(error.message);
    }
  }

  async removeActivitiesFromCategory(activities: string[]) {
    const userId = this.getUserOrThrowSync().id;

    const { error } = await this.supabaseService.client
      .from('Activity')
      .update({ category_id: null })
      .in('id', activities)
      .eq('userId', userId);

    if (error) {
      console.error('Failed to remove activities from category:', error);
      alert(error);
      throw new Error(error.message);
    }
  }

  async deleteCategory(categoryId: string) {
    const userId = this.getUserOrThrowSync().id;

    const { data: unassignedActivities, error: unassignError } =
      await this.supabaseService.client
        .from('Activity')
        .update({ category_id: null })
        .eq('category_id', categoryId)
        .eq('userId', userId)
        .select();

    if (unassignError) {
      alert(unassignError.message);
      throw new Error(unassignError.message);
    }

    const { error: deleteError } = await this.supabaseService.client
      .from('category')
      .delete()
      .eq('id', categoryId)
      .eq('user_id', userId);

    if (deleteError) {
      alert(deleteError.message);
      throw new Error(deleteError.message);
    }

    return unassignedActivities;
  }

  async updateCategory(categoryId: string, updatedData: Category) {
    const userId = this.getUserOrThrowSync().id;

    const { error } = await this.supabaseService.client
      .from('category')
      .update(updatedData)
      .eq('id', categoryId)
      .eq('user_id', userId);

    if (error) {
      alert(error.message);
      throw new Error(error.message);
    }
  }
}
