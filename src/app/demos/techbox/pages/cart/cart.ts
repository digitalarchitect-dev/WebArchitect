import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { formatRub } from '../../../../shared/money';
import { ProductCatalog } from '../../services/product-catalog';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart';
import { Product } from '../../models/product';

@Component({
  selector: 'app-techbox-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
})
export class CartPage {
  protected readonly catalog = inject(ProductCatalog);
  protected readonly cart = inject(CartService);
  protected readonly router = inject(Router);

  protected readonly formatRub = formatRub;
  protected readonly products = computed(() => this.catalog.products());
  protected readonly isLoading = this.catalog.isLoading;
  protected readonly error = this.catalog.error;
  protected readonly total = this.cart.total;
  protected readonly isEmpty = this.cart.isEmpty;

  protected readonly lines = computed(() => {
    const products = this.products();
    return this.cart
      .items()
      .map((item) => {
        const product = products.find((p: Product) => p.id === item.productId);
        return product ? { item, product } : null;
      })
      .filter((x): x is { item: CartItem; product: Product } => x !== null);
  });

  protected changeQty(productId: string, delta: number): void {
    this.cart.setQuantity(productId, this.cart.quantity(productId) + delta);
  }

  protected setQtyFromInput(productId: string, raw: string): void {
    const product = this.products().find((p) => p.id === productId);
    if (!product) return;
    const value = Math.max(1, Math.min(Number(raw) || 1, product.stock));
    this.cart.setQuantity(productId, value);
  }

  protected remove(productId: string): void {
    this.cart.remove(productId);
  }

  protected checkout(): void {
    if (this.cart.isEmpty()) return;
    this.router.navigate(['/projects/techbox/checkout']);
  }
}
