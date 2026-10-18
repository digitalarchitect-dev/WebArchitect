import { httpResource } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { Product } from '../models/product';

/** Загружает каталог один раз и отдаёт его всем страницам раздела. */
@Injectable({ providedIn: 'root' })
export class ProductCatalog {
  private readonly resource = httpResource<Product[]>(() => 'demo-data/techbox/products.json');

  readonly products = computed(() => this.resource.value() ?? []);
  readonly isLoading = this.resource.isLoading;
  readonly error = this.resource.error;

  readonly categories = computed(() =>
    [...new Set(this.products().map((p) => p.category))].sort((a, b) => a.localeCompare(b, 'ru')),
  );

  readonly brands = computed(() =>
    [...new Set(this.products().map((p) => p.brand))].sort((a, b) => a.localeCompare(b, 'ru')),
  );

  readonly priceBounds = computed(() => {
    const prices = this.products().map((p) => p.price);
    if (!prices.length) return { min: 0, max: 0 };
    return { min: Math.min(...prices), max: Math.max(...prices) };
  });

  byId(id: string): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  reload(): void {
    this.resource.reload();
  }
}
