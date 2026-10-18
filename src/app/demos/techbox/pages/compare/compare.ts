import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { formatRub } from '../../../../shared/money';
import { Product } from '../../models/product';
import { COMPARE_LIMIT, Compare } from '../../services/compare';
import { ProductCatalog } from '../../services/product-catalog';
import { formatRating, specDiffers, specKeys } from '../../services/product-filter';

@Component({
  selector: 'app-techbox-compare',
  imports: [RouterLink],
  templateUrl: './compare.html',
})
export class ComparePage {
  protected readonly compare = inject(Compare);
  private readonly catalog = inject(ProductCatalog);

  protected readonly formatRub = formatRub;
  protected readonly formatRating = formatRating;
  protected readonly limit = COMPARE_LIMIT;

  protected readonly products = computed(() =>
    this.compare
      .ids()
      .map((id) => this.catalog.byId(id))
      .filter((product): product is Product => product !== undefined),
  );

  protected readonly emptySlots = computed(() => Math.max(0, this.limit - this.products().length));

  private readonly rows = computed(() => specKeys(this.products()));
  protected readonly differencesOnly = computed(() => this.rows().filter((key) => this.differs(key)));

  protected differs(key: string): boolean {
    return specDiffers(this.products(), key);
  }

  protected value(product: Product, key: string): string {
    return product.specs[key] ?? '—';
  }

  protected clear(): void {
    this.compare.clear();
  }
}
