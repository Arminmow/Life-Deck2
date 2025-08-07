// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private supabase: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const {
      data: { session },
    } = await this.supabase.getSession();
    if (session) {
      return true;
    }
    // no session → redirect to /login
    return this.router.createUrlTree(['/login']);
  }
}
