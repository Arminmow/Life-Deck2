import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signInWithGoogle() {
    const { error } = await this.supabaseService.client.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error signing in:', error.message);
    }
  }

  async signOut() {
    const { error } = await this.supabaseService.client.auth.signOut();
    if (error) console.error('signout error :', error);
    alert('Signed out successfully');
  }

  getUser() {
    return this.supabaseService.client.auth.getUser();
  }

  getSession() {
    return this.supabaseService.client.auth.getSession();
  }

  onAuthStateChange(callback: (session: Session | null) => void) {
    this.supabaseService.client.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }
}
