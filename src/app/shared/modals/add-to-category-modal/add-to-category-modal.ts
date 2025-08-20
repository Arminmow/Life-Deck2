import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ActivityStore } from '../../../stores/activity/activity.store';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Category } from '../../../models/category.model';
import { ActivityEffects } from '../../../stores/activity/activity.effects';

@Component({
  selector: 'app-add-to-category-modal',
  imports: [
    NzSelectModule,
    NzModalModule,
    CommonModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './add-to-category-modal.html',
  styleUrl: './add-to-category-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCategoryModal {
  @Input() category!: Category;
  constructor(
    public activityStore: ActivityStore,
    private activityEffect: ActivityEffects
  ) {}
  addModalVisible: boolean = false;
  selectedActivities: string[] = [];

  showAddModal(): void {
    this.addModalVisible = true;
  }

  hideAddModal(): void {
    this.addModalVisible = false;
  }

  async submit() {
    console.log(this.selectedActivities);
    this.activityEffect.addActivitiesToCategoryEffect({
      categoryId: this.category.id,
      activityIds: this.selectedActivities,
    });
    this.addModalVisible = false;
  }
}
