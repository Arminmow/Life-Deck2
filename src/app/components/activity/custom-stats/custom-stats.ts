import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-custom-stats',
  imports: [NzCardModule , NzListModule , NzDescriptionsModule , NzTagModule],
  templateUrl: './custom-stats.html',
  styleUrl: './custom-stats.scss'
})
export class CustomStats {

}
