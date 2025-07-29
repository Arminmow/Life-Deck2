import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ActivityStore, Category } from '../../../core/stores/activity.store';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-add-to-category-modal',
  imports: [
    NzSelectModule,
    NzModalModule,
    CommonModule,
    FormsModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './add-to-category-modal.html',
  styleUrl: './add-to-category-modal.scss',
})
export class AddToCategoryModal {
  @Input() category!: Category;
  constructor(public activityStore: ActivityStore) {}
  addModalVisible: boolean = false;
  selectedActivities: string[] = [];

  showAddModal(): void {
    this.addModalVisible = true;
  }

  hideAddModal(): void {
    this.addModalVisible = false;
  }

  submit() {
    console.log(this.selectedActivities);
    this.activityStore.addActivitiesToCategoryEffect({
      activityIds: this.selectedActivities,
      categoryId: this.category.id,
    });
  }
}
