import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ActivityForm } from "../../forms/activity-form/activity-form";

@Component({
  selector: 'app-activity-modal',
  imports: [NzModalModule, NzButtonModule, ActivityForm],
  templateUrl: './activity-modal.html',
  styleUrls: ['./activity-modal.scss'],
})
export class ActivityModal {
  public isVisible = false;

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }
}
