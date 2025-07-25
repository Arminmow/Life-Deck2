import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout';
import { LoginLayout } from './core/layout/login-layout/login-layout';
import { NoAuthGuard } from './core/guards/no-auth-guard';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginLayout, canActivate: [NoAuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
