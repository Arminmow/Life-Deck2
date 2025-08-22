import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { EditActivityForm } from '../../../shared/forms/edit-activity-form/edit-activity-form';
import { Activity } from '../../../models/activity.model';
import { ActivityEffects } from '../../../stores/activity/activity.effects';

@Component({
  selector: 'app-activity-actions',
  imports: [NzIconModule, NzButtonModule, NzModalModule, EditActivityForm, CommonModule],
  templateUrl: './activity-actions.html',
  styleUrl: './activity-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityActions {
  constructor(
    private activityEffect : ActivityEffects,
    private modal: NzModalService
  ) {}

  @Input() activity!: Activity;
  isVisible = false;

  confirmDelete(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes, delete it',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(),
      nzCancelText: 'Cancel',
    });
  }

  confirmRemove(): void {
    this.modal.confirm({
      nzTitle:
        'Are you sure you want to remove this activity from its category?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes, remove it',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.remove(),
      nzCancelText: 'Cancel',
    });
  }

  remove() {
    this.activityEffect.removeActivitiesFromCategoryEffect([this.activity.id]);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  delete() {
    this.activityEffect.removeActivityEffect(this.activity.id);
  }
}
