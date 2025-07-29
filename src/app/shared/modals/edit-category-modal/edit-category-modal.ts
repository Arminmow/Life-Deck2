import { Component, Input } from '@angular/core';
import { Category } from '../../../core/stores/activity.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-category-modal',
  imports: [NzIconModule, NzModalModule],
  templateUrl: './edit-category-modal.html',
  styleUrl: './edit-category-modal.scss',
})
export class EditCategoryModal {
  @Input() category!: Category;

  isVisible: boolean = false;

  showModal() {
    this.isVisible = true;
  }

  hideModal() {
    this.isVisible = false;
  }
}
