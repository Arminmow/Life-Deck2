import { Component, Input } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ActivityStore, Category } from '../../stores/activity.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { AddToCategoryModal } from "../../../shared/modals/add-to-category-modal/add-to-category-modal";

@Component({
  selector: 'app-category-actions',
  imports: [
    NzIconModule,
    NzModalModule,
    NzSelectModule,
    CommonModule,
    FormsModule,
    AddToCategoryModal,
],
  templateUrl: './category-actions.html',
  styleUrl: './category-actions.scss',
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
}
