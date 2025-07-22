import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SupabaseService } from '../../../supabase/supabase.service';
import { ActivityStore } from '../../stores/activity.store';

@Component({
  selector: 'app-sidebar-menu',
  imports: [NzMenuModule, CommonModule, NzToolTipModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu implements OnInit {
  constructor(public activityStore: ActivityStore) {}
  activities: any[] = [];

  ngOnInit(): void {
    this.activityStore.loadActivities();
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://cdn-icons-png.flaticon.com/512/2686/2686454.png';
  }
}
