import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { formatRub } from '../../../../shared/money';
import { Car } from '../../models/car';
import { CarCard } from '../../components/car-card/car-card';
import { Favorites } from '../../services/favorites';

interface Collection {
  title: string;
  queryParams: Record<string, string>;
  count: number;
  image: string | null;
}

@Component({
  selector: 'app-autohub-home',
  imports: [RouterLink, CarCard],
  templateUrl: './home.html',
})
export class AutohubHome {
  private readonly router = inject(Router);
  protected readonly favorites = inject(Favorites);
  protected readonly formatRub = formatRub;

  protected readonly carsResource = httpResource<Car[]>(() => 'demo-data/autohub/cars.json');
  protected readonly cars = computed(() => this.carsResource.value() ?? []);
  protected readonly query = signal('');

  protected readonly heroCar = computed(
    () => [...this.cars()].sort((a, b) => b.photos.length - a.photos.length)[0] ?? null,
  );

  protected readonly withPhotos = computed(() => this.cars().filter((c) => c.photos.length));

  protected readonly deals = computed(() => {
    const withPhotos = this.withPhotos();
    const pool = withPhotos.length >= 3 ? withPhotos : this.cars();
    return [...pool].sort((a, b) => a.price - b.price).slice(0, 3);
  });

  protected readonly latest = computed(() =>
    [...this.cars()].sort((a, b) => b.year - a.year || a.mileage - b.mileage).slice(0, 6),
  );

  protected readonly brands = computed(() => {
    const counts = new Map<string, number>();
    for (const car of this.cars()) counts.set(car.brand, (counts.get(car.brand) ?? 0) + 1);
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ru'))
      .slice(0, 10);
  });

  protected readonly priceRange = computed(() => {
    const prices = this.cars().map((c) => c.price);
    if (!prices.length) return null;
    return { min: Math.min(...prices), max: Math.max(...prices) };
  });

  protected readonly collections = computed<Collection[]>(() => {
    const all = this.cars();
    const build = (
      title: string,
      queryParams: Record<string, string>,
      test: (car: Car) => boolean,
    ): Collection => {
      const matching = all.filter(test);
      const withPhoto = matching.find((c) => c.photos.length);
      return { title, queryParams, count: matching.length, image: withPhoto?.photos[0] ?? null };
    };
    return [
      build('Внедорожники', { body: 'Внедорожник' }, (car) => car.body === 'Внедорожник'),
      build('Электромобили', { fuel: 'Электро' }, (car) => car.fuel === 'Электро'),
      build('Гибриды', { fuel: 'Гибрид' }, (car) => car.fuel === 'Гибрид'),
      build('До 1,5 млн ₽', { priceMax: '1500000' }, (car) => car.price <= 1500000),
    ];
  });

  protected submitSearch(): void {
    const q = this.query().trim();
    this.router.navigate(['/projects/autohub/cars'], {
      queryParams: q ? { q } : {},
    });
  }

  protected toggleFavorite(car: Car): void {
    this.favorites.toggle(car.id);
  }
}
