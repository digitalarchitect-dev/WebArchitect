import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SkillioStore } from './services/skillio-store';

@Component({
  selector: 'app-skillio-shell', imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet], templateUrl: './skillio-shell.html',
  host: { class: 'theme-skillio block min-h-screen bg-bg text-text', '[class.theme-skillio-dark]': 'darkMode()' },
})
export class SkillioShell {
  protected readonly store = inject(SkillioStore);
  protected readonly query = signal('');
  protected readonly darkMode = signal(this.readTheme());
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      try {
        localStorage.setItem('skillio:theme', this.darkMode() ? 'dark' : 'light');
      } catch {
        // Local storage can be unavailable in private browsing.
      }
    });
  }

  protected toggleTheme(): void {
    this.darkMode.update((value) => !value);
  }

  private readTheme(): boolean {
    try {
      return localStorage.getItem('skillio:theme') !== 'light';
    } catch {
      return true;
    }
  }


  protected search(): void {
    const q = this.query().trim();
    this.router.navigate(['/projects/skillio'], { queryParams: q ? { q } : {} });
  }
}
