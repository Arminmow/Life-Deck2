import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Component({
  selector: 'app-login-layout',
  imports: [NzIconModule, NzButtonModule],
  templateUrl: './login-layout.html',
  styleUrl: './login-layout.scss',
})
export class LoginLayout {
  constructor(private supabaseService: SupabaseService) {}

  async signIn() {
    this.supabaseService.signInWithGoogle();
  }
}
