import { Component, computed, input, output } from '@angular/core';
import { Category, ProductFilters } from '../../models/product';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.html',
})
export class ProductFiltersPanel {
  readonly filters = input.required<ProductFilters>();
  readonly categories = input.required<Category[]>();
  readonly brands = input.required<string[]>();
  readonly resultCount = input.required<number>();
  readonly filtersChange = output<ProductFilters>();

  protected readonly ratingOptions = [
    { value: 4.5, label: 'от 4,5' },
    { value: 4, label: 'от 4,0' },
    { value: 3.5, label: 'от 3,5' },
  ];

  protected readonly activeCount = computed(() => {
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

  protected toggleCategory(category: Category): void {
    const list = this.filters().categories;
    this.patch({
      categories: list.includes(category) ? list.filter((c) => c !== category) : [...list, category],
    });
  }

  protected toggleBrand(brand: string): void {
    const list = this.filters().brands;
    this.patch({ brands: list.includes(brand) ? list.filter((b) => b !== brand) : [...list, brand] });
  }

  protected setPrice(bound: 'priceMin' | 'priceMax', raw: string): void {
    const trimmed = raw.trim();
    const value = trimmed === '' ? null : Number(trimmed);
    this.patch({ [bound]: value !== null && Number.isFinite(value) && value >= 0 ? value : null });
  }

  protected setRating(raw: string): void {
    const value = raw === '' ? null : Number(raw);
    this.patch({ minRating: value !== null && Number.isFinite(value) ? value : null });
  }

  protected setInStock(checked: boolean): void {
    this.patch({ inStockOnly: checked });
  }

  protected reset(): void {
    this.filtersChange.emit({
      query: '',
      categories: [],
      brands: [],
      priceMin: null,
      priceMax: null,
      inStockOnly: false,
      minRating: null,
    });
  }

  private patch(partial: Partial<ProductFilters>): void {
    this.filtersChange.emit({ ...this.filters(), ...partial });
  }
}
