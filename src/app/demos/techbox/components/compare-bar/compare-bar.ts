import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Compare, COMPARE_LIMIT } from '../../services/compare';
import { Product } from '../../models/product';
import { ProductCatalog } from '../../services/product-catalog';

@Component({
  selector: 'app-compare-bar',
  imports: [RouterLink],
  templateUrl: './compare-bar.html',
})
export class CompareBar {
  protected readonly compare = inject(Compare);
  private readonly catalog = inject(ProductCatalog);
  protected readonly limit = COMPARE_LIMIT;

  protected readonly items = computed(() =>
    this.compare
      .ids()
      .map((id) => this.catalog.byId(id))
      .filter((product): product is Product => product !== undefined),
  );

  /** Сообщение о переполнении списка показываем 6 секунд. */
  protected readonly visibleNotice = signal('');
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    effect(() => {
      const notice = this.compare.notice();
      this.visibleNotice.set(notice);
      clearTimeout(this.timer);
      if (notice) this.timer = setTimeout(() => this.visibleNotice.set(''), 6000);
    });
  }
}
