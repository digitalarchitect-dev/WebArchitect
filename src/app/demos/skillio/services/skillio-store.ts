import { Injectable, signal } from '@angular/core';
import { ExpertReview } from '../models/expert';

@Injectable({ providedIn: 'root' })
export class SkillioStore {
  private readonly storageKey = 'skillio-favorites';
  readonly favorites = signal<string[]>(this.readFavorites());
  readonly requestSent = signal(false);
  readonly userReviews = signal<Record<string, ExpertReview[]>>(this.readReviews());

  toggleFavorite(id: string): void {
    this.favorites.update((items) => {
      const next = items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
      this.writeFavorites(next);
      return next;
    });
  }

  isFavorite(id: string): boolean { return this.favorites().includes(id); }

  sendRequest(): void { this.requestSent.set(true); }

  resetRequest(): void { this.requestSent.set(false); }

  addReview(expertId: string, review: ExpertReview): void {
    this.userReviews.update((items) => {
      const next = { ...items, [expertId]: [...(items[expertId] ?? []), review] };
      try { localStorage.setItem('skillio-reviews', JSON.stringify(next)); } catch { /* storage may be unavailable */ }
      return next;
    });
  }

  private readFavorites(): string[] {
    try { return JSON.parse(localStorage.getItem(this.storageKey) ?? '[]') as string[]; } catch { return []; }
  }

  private writeFavorites(items: string[]): void {
    try { localStorage.setItem(this.storageKey, JSON.stringify(items)); } catch { /* storage may be unavailable */ }
  }

  private readReviews(): Record<string, ExpertReview[]> {
    try { return JSON.parse(localStorage.getItem('skillio-reviews') ?? '{}') as Record<string, ExpertReview[]>; } catch { return {}; }
  }
}
