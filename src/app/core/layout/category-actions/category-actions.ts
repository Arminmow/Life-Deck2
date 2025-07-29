import { Component, Input } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ActivityStore, Category } from '../../stores/activity.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-actions',
  imports: [
    NzIconModule,
    NzModalModule,
    NzSelectModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './category-actions.html',
  styleUrl: './category-actions.scss',
})
export class CategoryActions {
  @Input() category!: Category;

  editModalVisible: boolean = false;
  addModalVisible: boolean = false;
  selectedActivities: string[] = [];

  constructor(
    private modal: NzModalService,
    public activityStore: ActivityStore
  ) {}

  showEditModal(): void {
    this.editModalVisible = true;
  }

  showAddModal(): void {
    this.addModalVisible = true;
  }

  hideAddModal(): void {
    this.addModalVisible = false;
  }

  delete(id: string) {
    this.activityStore.deleteCategoryEffect(id);
  }

  submit() {
    console.log(this.selectedActivities);
    this.activityStore.addActivitiesToCategoryEffect({
      activityIds: this.selectedActivities,
      categoryId: this.category.id,
    });
  }

  confirmDelete(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this category?',
      nzOkText: 'Yes, delete it',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(id),
      nzCancelText: 'Cancel',
    });
  }
}
