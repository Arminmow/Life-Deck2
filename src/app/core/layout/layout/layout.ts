import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SidebarMenu } from '../sidebar-menu/sidebar-menu';
import { SupabaseService } from '../../../supabase/supabase.service';
import { ActivityModal } from "../../../shared/modals/activity-modal/activity-modal";
import { ActivityStore } from '../../stores/activity.store';
import { ActivityDetail } from "../activity-detail/activity-detail";

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
    ActivityDetail
],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent implements OnInit {
  isMobile = false;
  isSidebarCollapsed = false;
  isDrawerVisible = false;
  userEmail: string = 'Not logged in';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private supabaseService: SupabaseService,
    public activityStore : ActivityStore
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
    this.userEmail = session?.user?.email || "'Not logged in'";

    // Listen to future auth changes , this is test as well
    this.supabaseService.onAuthStateChange((session) => {
      this.userEmail = session?.user?.email || 'Not logged in';
    });
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isDrawerVisible = true;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }
  // this is test will move to login page later
  async signIn() {
    this.supabaseService.signInWithGoogle();
  }
  //also test
  async signOut() {
    this.supabaseService.signOut();
  }
}
