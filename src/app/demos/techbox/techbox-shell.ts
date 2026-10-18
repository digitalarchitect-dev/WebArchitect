import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme';
import { CartService } from './services/cart';
import { Compare } from './services/compare';
import { CompareBar } from './components/compare-bar/compare-bar';
import { PhotoCredits } from './components/photo-credits/photo-credits';

@Component({
  selector: 'app-techbox-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CompareBar, PhotoCredits],
  templateUrl: './techbox-shell.html',
  // Классы темы управляются ThemeService (класс theme-techbox на <html>),
  // поэтому здесь только базовые утилиты.
  host: { class: 'block min-h-screen bg-bg text-text' },
})
export class TechboxShell {
  protected readonly theme = inject(ThemeService);
  protected readonly compare = inject(Compare);
  protected readonly cart = inject(CartService);
  private readonly router = inject(Router);

  protected readonly headerQuery = signal('');

  protected search(): void {
    const q = this.headerQuery().trim();
    this.router.navigate(['/projects/techbox'], { queryParams: q ? { q } : {} });
  }
}
