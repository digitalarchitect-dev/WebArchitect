import { httpResource } from '@angular/common/http';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { formatNumber, formatRub } from '../../../../shared/money';
import { SITE } from '../../../../site.config';
import { Car } from '../../models/car';
import { Favorites } from '../../services/favorites';

@Component({
  selector: 'app-autohub-car-detail',
  imports: [RouterLink],
  templateUrl: './car-detail.html',
})
export class CarDetail {
  readonly id = input.required<string>();
  protected readonly favorites = inject(Favorites);
  protected readonly site = SITE;
  protected readonly formatRub = formatRub;
  protected readonly formatNumber = formatNumber;

  constructor() {
    // При переходе на другой автомобиль компонент переиспользуется — сбрасываем активный кадр.
    effect(() => {
      this.id();
      this.activeImage.set(0);
    });
  }

  protected readonly carsResource = httpResource<Car[]>(() => 'demo-data/autohub/cars.json');
  protected readonly car = computed(() => this.carsResource.value()?.find((c) => c.id === this.id()) ?? null);
  protected readonly similar = computed(() => {
    const current = this.car();
    if (!current) return [];
    return (this.carsResource.value() ?? [])
      .filter((c) => c.id !== current.id && c.body === current.body)
      .slice(0, 3);
  });

  protected readonly activeImage = signal(0);

  protected prevImage(count: number): void {
    this.activeImage.update((i) => (i - 1 + count) % count);
  }

  protected nextImage(count: number): void {
    this.activeImage.update((i) => (i + 1) % count);
  }

  protected selectImage(index: number): void {
    this.activeImage.set(index);
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

  protected specs(car: Car): { label: string; value: string }[] {
    return [
      { label: 'Год выпуска', value: String(car.year) },
      { label: 'Пробег', value: `${formatNumber(car.mileage)} км` },
      { label: 'Двигатель', value: car.engine },
      { label: 'Мощность', value: `${car.power} л.с.` },
      { label: 'Топливо', value: car.fuel },
      { label: 'Коробка', value: car.transmission },
      { label: 'Кузов', value: car.body },
      { label: 'Цвет', value: car.colorName },
    ];
  }
}
