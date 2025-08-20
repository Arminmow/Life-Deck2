import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/main-layout/layout';
import { LoginLayout } from './layout/login-layout/login-layout';
import { NoAuthGuard } from './guards/no-auth-guard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginLayout, canActivate: [NoAuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
