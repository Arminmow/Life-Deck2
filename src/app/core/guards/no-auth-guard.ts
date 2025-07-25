// src/app/core/guards/no-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private supabase: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const {
      data: { session },
    } = await this.supabase.getSession();
    if (session) {
      // already in? bounce to /dashboard
      return this.router.createUrlTree(['/dashboard']);
    }
    return true;
  }
}
