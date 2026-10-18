import { Injectable, inject, signal } from '@angular/core';
import { ProductCatalog } from './product-catalog';
import { Order, OrderCustomer, OrderItem, PaymentMethod, DeliveryMethod } from '../models/cart';
import { CartItem } from '../models/cart';

const KEY = 'techbox:orders';

/** Демо-заказы, хранящиеся только в браузере. Реальных платежей нет. */
@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly catalog = inject(ProductCatalog);
  readonly orders = signal<Order[]>(this.read());

  create(input: {
    items: CartItem[];
    customer: OrderCustomer;
    delivery: DeliveryMethod;
    payment: PaymentMethod;
    total: number;
  }): Order {
    const id =
      'TB-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
    const products = this.catalog.products();
    const orderItems: OrderItem[] = input.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        brand: product?.brand ?? '',
        name: product?.name ?? 'Товар',
        price: product?.price ?? 0,
        quantity: item.quantity,
        image: product?.photos[0] ?? null,
      };
    });
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order: Order = {
      id,
      items: orderItems,
      total,
      customer: input.customer,
      delivery: input.delivery,
      payment: input.payment,
      status: 'demo',
      createdAt: new Date().toISOString(),
    };

    this.orders.update((list) => [order, ...list]);
    this.persist();
    return order;
  }

  get(id: string): Order | undefined {
    return this.orders().find((o) => o.id === id);
  }

  private read(): Order[] {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
      return Array.isArray(parsed) ? (parsed as Order[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.orders()));
    } catch {
      // Хранилище недоступно: заказ не сохранится после перезагрузки.
    }
  }
}
