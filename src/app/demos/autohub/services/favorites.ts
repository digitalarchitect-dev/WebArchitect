import { Injectable, computed, signal } from '@angular/core';

const FAVORITES_KEY = 'autohub:favorites';

@Injectable({ providedIn: 'root' })
export class Favorites {
  readonly ids = signal<string[]>(this.read());
  readonly count = computed(() => this.ids().length);

  has(id: string): boolean {
    return this.ids().includes(id);
  }

  toggle(id: string): void {
    this.ids.update((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
    this.persist();
  }

  private read(): string[] {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]');
      return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.ids()));
    } catch {
      // Хранилище недоступно: избранное сохраняется только до перезагрузки.
    }
  }
}
