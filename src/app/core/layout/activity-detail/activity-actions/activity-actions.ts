import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-activity-actions',
  imports: [NzIconModule, NzButtonModule],
  templateUrl: './activity-actions.html',
  styleUrl: './activity-actions.scss',
})
export class ActivityActions {}
