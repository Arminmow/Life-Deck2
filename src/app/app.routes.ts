import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout';
import { LoginLayout } from './core/layout/login-layout/login-layout';

export const routes: Routes = [
  { path: 'dashboard', component: LayoutComponent },
  { path: 'login', component: LoginLayout },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
