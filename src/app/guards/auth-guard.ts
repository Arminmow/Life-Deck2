import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const {
      data: { session },
    } = await this.authService.getSession();
    if (session) {
      return true;
    }
    // no session → redirect to /login
    return this.router.createUrlTree(['/login']);
  }
}
