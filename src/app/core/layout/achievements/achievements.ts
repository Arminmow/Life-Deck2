import { Component } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-achievements',
  imports: [NzProgressModule],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss',
})
export class Achievements {}
