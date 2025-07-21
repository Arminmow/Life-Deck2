import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-activity-modal',
  imports: [NzModalModule, NzButtonModule],
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
