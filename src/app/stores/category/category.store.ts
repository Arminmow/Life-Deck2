import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Category } from '../../models/category.model';
import { catchError, EMPTY, from, switchMap, tap } from 'rxjs';
import { CategoryService } from '../../services/category/category-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivityStore } from '../activity/activity.store';

export interface CategoryState {
  categories: Category[];
}

@Injectable({ providedIn: 'root' })
export class CategoryStore extends ComponentStore<CategoryState> {
  constructor(
    private categoryService: CategoryService,
    private notification: NzNotificationService,
    private activityStore: ActivityStore
  ) {
    super({
      categories: [],
    });
  }

  readonly categories$ = this.select((state) => state.categories);

  readonly setCategories = this.updater<Category[]>((state, categories) => ({
    ...state,
    categories,
  }));

  readonly addCategory = this.updater<Category>((state, category) => ({
    ...state,
    categories: [...state.categories, category],
  }));

  readonly deleteCategory = this.updater<string>((state, id) => ({
    ...state,
    categories: state.categories.filter((c) => c.id !== id),
  }));

  readonly updateCategory = this.updater<{
    category_id: string;
    updatedCategory: Category;
  }>((state, { category_id, updatedCategory }) => {
    const updatedCategories = state.categories.map((c) =>
      c.id === category_id ? { ...updatedCategory } : c
    );
    return {
      ...state,
      categories: updatedCategories,
    };
  });

  readonly loadCategories = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        from(this.categoryService.getCategories()).pipe(
          tap({
            next: (categories) => this.setCategories(categories),
            error: (err) => console.error('Error loading categories:', err),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly updateCategoryEffect = async (
    category_id: string,
    updatedCategory: Category
  ): Promise<void> => {
    try {
      await this.categoryService.updateCategory(category_id, updatedCategory);

      this.updateCategory({ category_id, updatedCategory });
      this.notification.success('', 'Category Updated successfully');
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  readonly deleteCategoryEffect = async (categoryId: string) => {
    try {
      const unassignedActivities = await this.categoryService.deleteCategory(
        categoryId
      );
      this.deleteCategory(categoryId);
      this.activityStore.unassignActivities(unassignedActivities);
      this.notification.success('', 'Category Deleted successfully');
    } catch (error) {
      console.error('Failed to delete category:', `${error}`);
    }
  };

  readonly addCategoryEffect = async (
    category: Category & { activities: string[] }
  ): Promise<void> => {
    try {
      const addedCat = await this.categoryService.addCategory(category);

      this.addCategory(addedCat);
      if (category.activities.length > 0) {
        this.activityStore.addActivityToCategory({
          activityIds: category.activities,
          categoryId: addedCat.id,
        });
      }
      this.notification.success('', 'Category Added successfully');
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };
}
