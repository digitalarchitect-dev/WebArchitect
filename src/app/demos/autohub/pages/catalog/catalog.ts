import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { formatRub } from '../../../../shared/money';
import {
  BodyType,
  Car,
  CarFilters,
  CarSort,
  EMPTY_CAR_FILTERS,
  FuelType,
  Transmission,
} from '../../models/car';
import { Favorites } from '../../services/favorites';
import { filterAndSortCars } from '../../services/car-filter';
import { CarCard } from '../../components/car-card/car-card';
import { CarFiltersPanel } from '../../components/car-filters/car-filters';

export const CAR_SORT_OPTIONS: { value: CarSort; label: string }[] = [
  { value: 'relevance', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'year-desc', label: 'Сначала новые' },
  { value: 'mileage-asc', label: 'Меньше пробег' },
];

export const CAR_BODIES: BodyType[] = ['Седан', 'Внедорожник', 'Хетчбек', 'Универсал'];
export const CAR_FUELS: FuelType[] = ['Бензин', 'Дизель', 'Гибрид', 'Электро'];
export const CAR_TRANSMISSIONS: Transmission[] = ['Автомат', 'Механика'];

@Component({
  selector: 'app-autohub-catalog',
  imports: [CarCard, CarFiltersPanel],
  templateUrl: './catalog.html',
})
export class Catalog {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly favorites = inject(Favorites);
  protected readonly formatRub = formatRub;

  protected readonly carsResource = httpResource<Car[]>(() => 'demo-data/autohub/cars.json');

  protected readonly cars = computed(() => this.carsResource.value() ?? []);

  protected readonly sortOptions = CAR_SORT_OPTIONS;
  protected readonly bodies = CAR_BODIES;
  protected readonly fuels = CAR_FUELS;
  protected readonly transmissions = CAR_TRANSMISSIONS;

  protected readonly brands = computed(() =>
    [...new Set(this.cars().map((c) => c.brand))].sort((a, b) => a.localeCompare(b, 'ru')),
  );

  protected readonly filters = signal<CarFilters>(EMPTY_CAR_FILTERS);
  protected readonly sort = signal<CarSort>('relevance');
  protected readonly filtersOpen = signal(false);

  protected readonly results = computed(() =>
    filterAndSortCars(this.cars(), this.filters(), this.sort()),
  );

  protected readonly activeFilterCount = computed(() => {
    const f = this.filters();
    return (
      (f.query.trim() ? 1 : 0) +
      f.brands.length +
      f.bodies.length +
      f.fuels.length +
      (f.transmission ? 1 : 0) +
      (f.priceMin !== null ? 1 : 0) +
      (f.priceMax !== null ? 1 : 0) +
      (f.yearMin !== null ? 1 : 0)
    );
  });

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        if (this.canon(this.stateParams()) !== this.canon(this.paramMapToParams(params))) {
          this.restoreFromUrl(params);
        }
      });
  }

  private stateParams(): URLSearchParams {
    const f = this.filters();
    const p = new URLSearchParams();
    const add = (key: string, value: string | number | null): void => {
      if (value !== null && value !== '') p.append(key, String(value));
    };
    add('q', f.query.trim() || null);
    for (const brand of f.brands) p.append('brand', brand);
    for (const body of f.bodies) p.append('body', body);
    for (const fuel of f.fuels) p.append('fuel', fuel);
    add('transmission', f.transmission);
    add('priceMin', f.priceMin);
    add('priceMax', f.priceMax);
    add('yearMin', f.yearMin);
    if (this.sort() !== 'relevance') add('sort', this.sort());
    return p;
  }

  private paramMapToParams(params: ParamMap): URLSearchParams {
    const p = new URLSearchParams();
    for (const key of params.keys) for (const value of params.getAll(key)) p.append(key, value);
    return p;
  }

  private canon(params: URLSearchParams): string {
    return [...params.entries()]
      .map(([key, value]) => `${key}=${value}`)
      .sort()
      .join('&');
  }

  protected onFiltersChange(next: CarFilters): void {
    this.filters.set(next);
    this.syncUrl();
  }

  protected onSortChange(value: string): void {
    const option = CAR_SORT_OPTIONS.find((o) => o.value === value);
    if (!option) return;
    this.sort.set(option.value);
    this.syncUrl();
  }

  protected resetAll(): void {
    this.filters.set(EMPTY_CAR_FILTERS);
    this.sort.set('relevance');
    this.syncUrl();
  }

  protected toggleFavorite(car: Car): void {
    this.favorites.toggle(car.id);
  }

  private restoreFromUrl(params: ParamMap): void {
    const list = (key: string) => params.getAll(key);
    const num = (key: string): number | null => {
      const raw = params.get(key);
      if (raw === null || raw.trim() === '') return null;
      const n = Number(raw);
      return Number.isFinite(n) ? n : null;
    };
    const pick = <T extends string>(value: string | null, allowed: readonly T[]): T | null =>
      allowed.find((a) => a === value) ?? null;

    this.filters.set({
      query: params.get('q') ?? '',
      brands: list('brand'),
      bodies: list('body').filter((b): b is BodyType => CAR_BODIES.includes(b as BodyType)),
      fuels: list('fuel').filter((f): f is FuelType => CAR_FUELS.includes(f as FuelType)),
      transmission: pick(params.get('transmission'), CAR_TRANSMISSIONS),
      priceMin: num('priceMin'),
      priceMax: num('priceMax'),
      yearMin: num('yearMin'),
    });
    this.sort.set(pick(params.get('sort'), CAR_SORT_OPTIONS.map((o) => o.value)) ?? 'relevance');
  }

  private syncUrl(): void {
    const f = this.filters();
    this.router.navigate([], {
      relativeTo: this.route,
      replaceUrl: true,
      queryParams: {
        q: f.query.trim() || null,
        brand: f.brands.length ? f.brands : null,
        body: f.bodies.length ? f.bodies : null,
        fuel: f.fuels.length ? f.fuels : null,
        transmission: f.transmission,
        priceMin: f.priceMin,
        priceMax: f.priceMax,
        yearMin: f.yearMin,
        sort: this.sort() === 'relevance' ? null : this.sort(),
      },
    });
  }
}
