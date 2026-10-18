import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { formatRub } from '../../../../shared/money';
import { OrderService } from '../../services/order';
import { Order } from '../../models/cart';

@Component({
  selector: 'app-techbox-order-confirmation',
  imports: [RouterLink],
  templateUrl: './order-confirmation.html',
})
export class OrderConfirmationPage {
  readonly id = input.required<string>();

  protected readonly orderService = inject(OrderService);
  protected readonly router = inject(Router);
  protected readonly formatRub = formatRub;

  protected readonly order = computed(() => this.orderService.get(this.id()));

  protected readonly formattedDate = computed(() => {
    const order = this.order();
    if (!order) return '';
    return new Date(order.createdAt).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  protected readonly itemsTotal = computed(() => {
    const order = this.order();
    return order ? order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
  });
}
