import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivityStore, Category } from '../../stores/activity.store';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-category-actions',
  imports: [NzIconModule],
  templateUrl: './category-actions.html',
  styleUrl: './category-actions.scss',
})
export class CategoryActions {
  @Input() category!: Category;

  constructor(
    private modal: NzModalService,
    public activityStore: ActivityStore
  ) {}

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
