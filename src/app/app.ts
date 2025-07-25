import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SupabaseService } from './supabase/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Life Deck2';

  constructor(private supabase: SupabaseService, private router: Router) {}

  
}
