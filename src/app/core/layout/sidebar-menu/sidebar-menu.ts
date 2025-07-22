import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SupabaseService } from '../../../supabase/supabase.service';

@Component({
  selector: 'app-sidebar-menu',
  imports: [NzMenuModule, CommonModule, NzToolTipModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu implements OnInit {
  constructor(private supabaseService: SupabaseService) {}
  activities: any[] = [];

  ngOnInit(): void {
    this.loadActivities();
    console.log(this.activities);
  }

  async loadActivities() {
    this.activities = await this.supabaseService.getActivities();
  }
}
