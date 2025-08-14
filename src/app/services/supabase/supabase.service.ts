import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { Activity, Category } from '../../stores/activity/activity.store';

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

  

 

  

  

  

  
}
