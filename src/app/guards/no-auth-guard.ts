import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const {
      data: { session },
    } = await this.authService.getSession();
    if (session) {
      // already in? bounce to /dashboard
      return this.router.createUrlTree(['/dashboard']);
    }
    return true;
  }
}
