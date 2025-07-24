import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Activity, ActivityStore } from '../../../stores/activity.store';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { EditActivityForm } from "../../../../shared/forms/edit-activity-form/edit-activity-form";

@Component({
  selector: 'app-activity-actions',
  imports: [NzIconModule, NzButtonModule, NzModalModule, EditActivityForm],
  templateUrl: './activity-actions.html',
  styleUrl: './activity-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityActions {
  constructor(private activityStore: ActivityStore , private modal: NzModalService) {}

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
      nzCancelText: 'Cancel'
    });
  }

   showModal(): void {
    this.isVisible = true;
  }

   handleCancel(): void {
    this.isVisible = false;
  }

  delete() {
    this.activityStore.removeActivityEffect(this.activity.id);
  }
}
