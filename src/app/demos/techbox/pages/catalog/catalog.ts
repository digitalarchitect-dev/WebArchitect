import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  CATEGORIES,
  Category,
  EMPTY_PRODUCT_FILTERS,
  ProductFilters,
  ProductSort,
  PRODUCT_SORTS,
} from '../../models/product';
import { filterAndSortProducts } from '../../services/product-filter';
import { ProductCatalog } from '../../services/product-catalog';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductFiltersPanel } from '../../components/product-filters/product-filters';

const SORT_LABELS: Record<ProductSort, string> = {
  relevance: 'По умолчанию',
  'price-asc': 'Сначала дешёвые',
  'price-desc': 'Сначала дорогие',
  'rating-desc': 'Высокий рейтинг',
  'reviews-desc': 'Больше отзывов',
};

@Component({
  selector: 'app-techbox-catalog',
  imports: [ProductCard, ProductFiltersPanel],
  templateUrl: './catalog.html',
})
export class Catalog {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly catalog = inject(ProductCatalog);

  protected readonly categories = CATEGORIES;
  protected readonly sortOptions = PRODUCT_SORTS.map((value) => ({ value, label: SORT_LABELS[value] }));

  protected readonly filters = signal<ProductFilters>(EMPTY_PRODUCT_FILTERS);
  protected readonly sort = signal<ProductSort>('relevance');
  protected readonly filtersOpen = signal(false);

  protected readonly results = computed(() =>
    filterAndSortProducts(this.catalog.products(), this.filters(), this.sort()),
  );

  protected readonly activeFilterCount = computed(() => {
    const f = this.filters();
    return (
      (f.query.trim() ? 1 : 0) +
      f.categories.length +
      f.brands.length +
      (f.priceMin !== null ? 1 : 0) +
      (f.priceMax !== null ? 1 : 0) +
      (f.inStockOnly ? 1 : 0) +
      (f.minRating !== null ? 1 : 0)
    );
  });

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      if (this.canon(this.stateParams()) !== this.canon(this.paramMapToParams(params))) {
        this.restoreFromUrl(params);
      }
    });
  }

  protected toggleCategory(category: Category): void {
    const list = this.filters().categories;
    this.onFiltersChange({
      ...this.filters(),
      categories: list.includes(category) ? list.filter((c) => c !== category) : [...list, category],
    });
  }

  protected onSearch(value: string): void {
    this.onFiltersChange({ ...this.filters(), query: value });
  }

  protected onFiltersChange(next: ProductFilters): void {
    this.filters.set(next);
    this.syncUrl();
  }

  protected onSortChange(value: string): void {
    const option = PRODUCT_SORTS.find((s) => s === value);
    if (!option) return;
    this.sort.set(option);
    this.syncUrl();
  }

  protected resetAll(): void {
    this.filters.set(EMPTY_PRODUCT_FILTERS);
    this.sort.set('relevance');
    this.syncUrl();
  }

  private stateParams(): URLSearchParams {
    const f = this.filters();
    const p = new URLSearchParams();
    const add = (key: string, value: string | number | null): void => {
      if (value !== null && value !== '') p.append(key, String(value));
    };
    add('q', f.query.trim() || null);
    for (const category of f.categories) p.append('cat', category);
    for (const brand of f.brands) p.append('brand', brand);
    add('priceMin', f.priceMin);
    add('priceMax', f.priceMax);
    add('inStock', f.inStockOnly ? '1' : null);
    add('rating', f.minRating);
    if (this.sort() !== 'relevance') add('sort', this.sort());
    return p;
  }

  private paramMapToParams(params: ParamMap): URLSearchParams {
    const p = new URLSearchParams();
    for (const key of params.keys) for (const value of params.getAll(key)) p.append(key, value);
    return p;
  }

  private canon(params: URLSearchParams): string {
    return [...params.entries()]
      .map(([key, value]) => `${key}=${value}`)
      .sort()
      .join('&');
  }

  private restoreFromUrl(params: ParamMap): void {
    const num = (key: string): number | null => {
      const raw = params.get(key);
      if (raw === null || raw.trim() === '') return null;
      const value = Number(raw);
      return Number.isFinite(value) ? value : null;
    };
    const sort = PRODUCT_SORTS.find((s) => s === params.get('sort')) ?? 'relevance';

    this.filters.set({
      query: params.get('q') ?? '',
      categories: params.getAll('cat').filter((c): c is Category => CATEGORIES.includes(c as Category)),
      brands: params.getAll('brand'),
      priceMin: num('priceMin'),
      priceMax: num('priceMax'),
      inStockOnly: params.get('inStock') === '1',
      minRating: num('rating'),
    });
    this.sort.set(sort);
  }

  private syncUrl(): void {
    const f = this.filters();
    this.router.navigate([], {
      relativeTo: this.route,
      replaceUrl: true,
      queryParams: {
        q: f.query.trim() || null,
        cat: f.categories.length ? f.categories : null,
        brand: f.brands.length ? f.brands : null,
        priceMin: f.priceMin,
        priceMax: f.priceMax,
        inStock: f.inStockOnly ? '1' : null,
        rating: f.minRating,
        sort: this.sort() === 'relevance' ? null : this.sort(),
      },
    });
  }
}
