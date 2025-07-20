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
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent implements OnInit {
  isMobile = false;
  isSidebarCollapsed = false;
  isDrawerVisible = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.isDrawerVisible = false;
        }
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
}
