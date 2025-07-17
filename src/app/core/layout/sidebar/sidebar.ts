import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, NzLayoutModule, NzDrawerModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() isMobile: boolean = false;
  @Input() open: boolean = true;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClose() {
    this.open = false;
    this.openChange.emit(this.open);
  }
}
