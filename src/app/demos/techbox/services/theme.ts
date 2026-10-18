import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const KEY = 'techbox:theme:v2';

/** Переключение светлой/тёмной темы только для раздела Techbox. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>('light');

  constructor() {
    const saved = this.read();
    this.theme.set(saved ?? 'dark');
    this.apply(this.theme());
    effect(() => {
      const theme = this.theme();
      this.apply(theme);
      this.persist(theme);
    });
  }

  toggle(): void {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
  }

  private read(): Theme | null {
    try {
      return (localStorage.getItem(KEY) as Theme | null) ?? null;
    } catch {
      return null;
    }
  }

  private persist(theme: Theme): void {
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // Хранилище недоступно: выбор темы не сохранится после перезагрузки.
    }
  }

  private apply(theme: Theme): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    // Светлая тема — класс .theme-techbox, тёмная — .theme-techbox-dark.
    root.classList.toggle('theme-techbox', theme === 'light');
    root.classList.toggle('theme-techbox-dark', theme === 'dark');
  }
}
