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

  ngOnInit() {
    this.supabase.onAuthStateChange((session) => {
      if (session) {
        // user just signed in
        this.router.navigate(['/dashboard']);
      } else {
        // user just signed out (or never signed in)
        this.router.navigate(['/login']);
      }
    });
  }
}
