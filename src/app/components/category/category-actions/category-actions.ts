import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddToCategoryModal } from '../../../shared/modals/add-to-category-modal/add-to-category-modal';
import { EditCategoryModal } from '../../../shared/modals/edit-category-modal/edit-category-modal';
import { ActivityStore, Category } from '../../../stores/activity/activity.store';

@Component({
  selector: 'app-category-actions',
  imports: [
    NzIconModule,
    NzModalModule,
    NzSelectModule,
    CommonModule,
    FormsModule,
    AddToCategoryModal,
    EditCategoryModal,
  ],
  templateUrl: './category-actions.html',
  styleUrl: './category-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryActions {
  @Input() category!: Category;

  editModalVisible: boolean = false;

  constructor(
    private modal: NzModalService,
    public activityStore: ActivityStore
  ) {}

  showEditModal(): void {
    this.editModalVisible = true;
  }

  delete(id: string) {
    this.activityStore.deleteCategoryEffect(id);
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

  get log() {
    console.log('Category actions Rendered');

    return true;
  }
}
