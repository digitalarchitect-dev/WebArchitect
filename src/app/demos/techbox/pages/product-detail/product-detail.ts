import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { formatRub } from '../../../../shared/money';
import { ProductCatalog } from '../../services/product-catalog';
import { Compare } from '../../services/compare';
import { CartService } from '../../services/cart';
import { discountPercent, formatRating } from '../../services/product-filter';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-techbox-product-detail',
  imports: [FormsModule, RouterLink, ProductCard],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  readonly id = input.required<string>();

  protected readonly catalog = inject(ProductCatalog);
  protected readonly compare = inject(Compare);
  protected readonly cart = inject(CartService);
  protected readonly formatRub = formatRub;
  protected readonly formatRating = formatRating;

  protected readonly activeImage = signal(0);
  protected readonly qty = signal(1);

  protected readonly product = computed(() => this.catalog.byId(this.id()) ?? null);
  protected readonly discount = computed(() => {
    const product = this.product();
    return product ? discountPercent(product) : null;
  });
  protected readonly specs = computed(() => Object.entries(this.product()?.specs ?? {}));
  protected readonly similar = computed(() => {
    const current = this.product();
    if (!current) return [];
    return this.catalog
      .products()
      .filter((p) => p.id !== current.id && p.category === current.category)
      .slice(0, 3);
  });

  protected readonly cartQuantity = computed(() => this.cart.quantity(this.id()));
  protected readonly inCart = computed(() => this.cart.has(this.id()));
  protected readonly available = computed(() => {
    const product = this.product();
    if (!product) return 0;
    return product.stock - this.cartQuantity();
  });

  protected readonly canAdd = computed(() => {
    const product = this.product();
    if (!product || product.stock === 0) return false;
    return this.qty() > 0 && this.qty() <= this.available();
  });

  constructor() {
    // При переходе между товарами компонент переиспользуется — сбрасываем активный кадр и количество.
    effect(() => {
      this.id();
      this.activeImage.set(0);
      this.qty.set(1);
    });
  }

  protected prevImage(count: number): void {
    this.activeImage.update((index) => (index - 1 + count) % count);
  }

  protected nextImage(count: number): void {
    this.activeImage.update((index) => (index + 1) % count);
  }

  protected onGalleryKey(event: KeyboardEvent, count: number): void {
    if (count < 2) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevImage(count);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextImage(count);
    }
  }

  protected addToCart(): void {
    const product = this.product();
    if (!product || product.stock === 0) return;
    const quantity = Math.min(this.qty(), this.available());
    if (quantity < 1) return;
    this.qty.set(quantity);
    this.cart.add(product.id, quantity);
  }

  protected clampQty(value: number): number {
    const stock = this.product()?.stock ?? 0;
    return Math.max(1, Math.min(value, stock));
  }
}
