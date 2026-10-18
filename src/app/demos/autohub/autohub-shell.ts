import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Favorites } from './services/favorites';
import { PhotoCredits } from './components/photo-credits/photo-credits';

@Component({
  selector: 'app-autohub-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PhotoCredits],
  templateUrl: './autohub-shell.html',
  host: { class: 'theme-autohub block min-h-screen bg-bg text-text' },
})
export class AutohubShell {
  protected readonly favorites = inject(Favorites);
}
