import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SidebarMenu } from '../sidebar-menu/sidebar-menu';
import { SupabaseService } from '../../../supabase/supabase.service';
import { ActivityModal } from '../../../shared/modals/activity-modal/activity-modal';
import { ActivityStore } from '../../stores/activity.store';
import { ActivityDetail } from '../activity-detail/activity-detail';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    CommonModule,
    NzDrawerModule,
    NzButtonModule,
    SidebarMenu,
    ActivityModal,
    ActivityDetail,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent implements OnInit {
  isMobile = false;
  isSidebarCollapsed = false;
  isDrawerVisible = false;
  user: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private supabaseService: SupabaseService,
    public activityStore: ActivityStore,
    private router : Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.isDrawerVisible = false;
        }
      });

    // Check session on load
    const {
      data: { session },
    } = await this.supabaseService.getSession();
    this.user = session?.user?.email || "'Not logged in'";
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isDrawerVisible = true;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }
  async signOut() {
    await this.supabaseService.signOut();
    this.router.navigate(['login'])
  }
}
