import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://aphguiraegrtkslgqorb.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwaGd1aXJhZWdydGtzbGdxb3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTI2ODksImV4cCI6MjA2ODUyODY4OX0.74RaCriUF5VgdrxTChCXF0epWrX3Ji7dktI19HKS2H8'
    );
  }

  get client() {
    return this.supabase;
  }

  async signInWithGoogle() {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error signing in:', error.message);
    }
  }

  getUser() {
    return this.supabase.auth.getUser();
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  onAuthStateChange(callback: (session: Session | null) => void) {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }
}
