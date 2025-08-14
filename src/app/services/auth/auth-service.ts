import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Session, User } from '@supabase/supabase-js';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _user$ = new BehaviorSubject<User | null>(null);
  readonly user$: Observable<User | null> = this._user$.asObservable();

  constructor(private supabaseService: SupabaseService) {
    // Fetch the user on initialization
    this.bootstrap;

    // Updated the user on change
    this.supabaseService.client.auth.onAuthStateChange((_event, session) => {
      this._user$.next(session?.user ?? null);
    });
  }

  private async bootstrap(): Promise<void> {
    try {
      const { data } = await this.supabaseService.client.auth.getUser();
      this._user$.next(data.user ?? null);
    } catch (err) {
      console.error('Auth bootstrap failed', err);
      this._user$.next(null);
    }
  }

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

  getCurrentUser(): User | null {
    return this._user$.value;
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
