import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-activity-btn',
  imports: [NzButtonModule , NzIconModule],
  templateUrl: './activity-btn.html',
  styleUrl: './activity-btn.scss'
})
export class ActivityBtn {

}
