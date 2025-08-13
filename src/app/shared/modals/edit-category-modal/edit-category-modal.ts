import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '../../../stores/activity/activity.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EditCategoryForm } from '../../forms/edit-category-form/edit-category-form';

@Component({
  selector: 'app-edit-category-modal',
  imports: [NzIconModule, NzModalModule, EditCategoryForm],
  templateUrl: './edit-category-modal.html',
  styleUrl: './edit-category-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
