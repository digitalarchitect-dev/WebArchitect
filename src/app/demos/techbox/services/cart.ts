import { Injectable, computed, inject, signal } from '@angular/core';
import { ProductCatalog } from './product-catalog';
import { CartItem } from '../models/cart';
import { Product } from '../models/product';

const KEY = 'techbox:cart';

/** Корзина демо-магазина. Сохраняется в браузере, реального оформления нет. */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly catalog = inject(ProductCatalog);

  readonly items = signal<CartItem[]>(this.read());
  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly isEmpty = computed(() => this.items().length === 0);

  readonly total = computed(() => {
    const products = this.catalog.products();
    return this.items().reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);
  });

  has(productId: string): boolean {
    return this.items().some((i) => i.productId === productId);
  }

  quantity(productId: string): number {
    return this.items().find((i) => i.productId === productId)?.quantity ?? 0;
  }

  /** Добавить товар. 'limit' — не хватает наличия, 'outofstock' — товара нет в каталоге. */
  add(productId: string, quantity = 1): 'added' | 'updated' | 'limit' | 'outofstock' {
    const product = this.catalog.products().find((p) => p.id === productId);
    if (!product || product.stock === 0) return 'outofstock';

    const current = this.quantity(productId);
    const next = current + quantity;
    if (next > product.stock) return 'limit';

    if (this.has(productId)) {
      this.items.update((list) =>
        list.map((i) => (i.productId === productId ? { ...i, quantity: next } : i)),
      );
    } else {
      this.items.update((list) => [...list, { productId, quantity }]);
    }
    this.persist();
    return current === 0 ? 'added' : 'updated';
  }

  setQuantity(productId: string, quantity: number): void {
    const product = this.catalog.products().find((p) => p.id === productId);
    if (!product) return;
    if (quantity < 1) {
      this.remove(productId);
      return;
    }
    if (quantity > product.stock) return;
    this.items.update((list) =>
      list.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    );
    this.persist();
  }

  remove(productId: string): void {
    this.items.update((list) => list.filter((i) => i.productId !== productId));
    this.persist();
  }

  clear(): void {
    this.items.set([]);
    this.persist();
  }

  private read(): CartItem[] {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
      return Array.isArray(parsed)
        ? parsed.filter(
            (i): i is CartItem =>
              typeof i === 'object' &&
              i !== null &&
              typeof (i as CartItem).productId === 'string' &&
              typeof (i as CartItem).quantity === 'number' &&
              (i as CartItem).quantity > 0,
          )
        : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.items()));
    } catch {
      // Хранилище недоступно: корзина живёт до перезагрузки.
    }
  }
}
