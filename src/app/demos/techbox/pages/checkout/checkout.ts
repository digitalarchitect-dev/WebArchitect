import { Component, computed, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { formatRub } from '../../../../shared/money';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { ProductCatalog } from '../../services/product-catalog';
import {
  CartItem,
  DeliveryMethod,
  OrderCustomer,
  PaymentMethod,
} from '../../models/cart';
import { Product } from '../../models/product';

@Component({
  selector: 'app-techbox-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.html',
})
export class CheckoutPage {
  protected readonly cart = inject(CartService);
  protected readonly catalog = inject(ProductCatalog);
  protected readonly orderService = inject(OrderService);
  protected readonly router = inject(Router);

  protected readonly formatRub = formatRub;
  protected readonly products = computed(() => this.catalog.products());
  protected readonly isLoading = this.catalog.isLoading;
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

  protected readonly customer: OrderCustomer = {
    name: '',
    email: '',
    phone: '',
    cityAddress: '',
  };
  protected delivery: DeliveryMethod = 'delivery';
  protected payment: PaymentMethod = 'card';
  protected submitted = false;
  protected error: string | null = null;

  protected readonly deliveryLabels: Record<DeliveryMethod, string> = {
    delivery: 'Доставка (1–3 дня по России)',
    pickup: 'Самовывоз со склада в Москве',
  };
  protected readonly paymentLabels: Record<PaymentMethod, string> = {
    card: 'Демо-банковская карта',
    cash: 'Оплата при получении',
  };
  protected readonly deliveryMethods: DeliveryMethod[] = ['delivery', 'pickup'];
  protected readonly paymentMethods: PaymentMethod[] = ['card', 'cash'];

  protected placeOrder(form: NgForm): void {
    this.submitted = true;
    this.error = null;

    if (form.invalid) {
      this.error = 'Проверьте заполнение формы';
      return;
    }
    if (this.cart.isEmpty()) {
      this.router.navigate(['/projects/techbox/cart']);
      return;
    }

    const order = this.orderService.create({
      items: this.cart.items(),
      customer: { ...this.customer },
      delivery: this.delivery,
      payment: this.payment,
      total: this.total(),
    });
    this.cart.clear();
    this.router.navigate(['/projects/techbox/order', order.id], {
      replaceUrl: true,
    });
  }
}
