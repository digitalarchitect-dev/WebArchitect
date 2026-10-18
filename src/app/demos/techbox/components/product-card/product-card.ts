import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { formatRub } from '../../../../shared/money';
import { Product } from '../../models/product';
import { Compare } from '../../services/compare';
import { CartService } from '../../services/cart';
import { discountPercent, formatRating } from '../../services/product-filter';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();
  /** Первые строки каталога грузятся без задержки, чтобы не мигали при прокрутке. */
  readonly priority = input(false);

  protected readonly router = inject(Router);
  protected readonly compare = inject(Compare);
  protected readonly cart = inject(CartService);
  protected readonly formatRub = formatRub;
  protected readonly formatRating = formatRating;

  protected readonly discount = computed(() => discountPercent(this.product()));

  protected toggleCompare(): void {
    this.compare.toggle(this.product().id);
  }

  protected toggleCart(): void {
    const product = this.product();
    if (product.stock === 0) return;
    if (this.cart.has(product.id)) {
      this.router.navigate(['/projects/techbox/cart']);
      return;
    }
    const result = this.cart.add(product.id);
    if (result === 'limit') {
      // Достигнут лимит наличия — кнопка остаётся активной, но количество нельзя увеличить.
    }
  }
}
