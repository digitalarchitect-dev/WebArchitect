import { Injectable, computed, signal } from '@angular/core';

const COMPARE_KEY = 'techbox:compare';
export const COMPARE_LIMIT = 4;

export type CompareChange = 'added' | 'removed' | 'limit';

/** Список товаров для сравнения: до четырёх позиций, сохраняется в браузере. */
@Injectable({ providedIn: 'root' })
export class Compare {
  readonly ids = signal<string[]>(this.read());
  readonly count = computed(() => this.ids().length);
  readonly isFull = computed(() => this.ids().length >= COMPARE_LIMIT);

  /** Сообщение о том, что список сравнения заполнен. Показывается в панели сравнения. */
  readonly notice = signal('');

  has(id: string): boolean {
    return this.ids().includes(id);
  }

  toggle(id: string): CompareChange {
    if (this.has(id)) {
      this.ids.update((list) => list.filter((x) => x !== id));
      this.persist();
      return 'removed';
    }
    if (this.isFull()) {
      this.notice.set(`В сравнении уже ${COMPARE_LIMIT} товара — уберите один, чтобы добавить новый.`);
      return 'limit';
    }
    this.notice.set('');
    this.ids.update((list) => [...list, id]);
    this.persist();
    return 'added';
  }

  remove(id: string): void {
    this.ids.update((list) => list.filter((x) => x !== id));
    this.persist();
  }

  clear(): void {
    this.ids.set([]);
    this.persist();
  }

  private read(): string[] {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(COMPARE_KEY) ?? '[]');
      return Array.isArray(parsed)
        ? parsed.filter((x): x is string => typeof x === 'string').slice(0, COMPARE_LIMIT)
        : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(this.ids()));
    } catch {
      // Хранилище недоступно: список сравнения живёт до перезагрузки.
    }
  }
}
