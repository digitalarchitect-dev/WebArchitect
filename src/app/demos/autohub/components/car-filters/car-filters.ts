import { Component, input, output } from '@angular/core';
import { BodyType, CarFilters, FuelType, Transmission } from '../../models/car';

@Component({
  selector: 'app-car-filters',
  templateUrl: './car-filters.html',
})
export class CarFiltersPanel {
  readonly filters = input.required<CarFilters>();
  readonly brands = input.required<string[]>();
  readonly bodies = input.required<BodyType[]>();
  readonly fuels = input.required<FuelType[]>();
  readonly transmissions = input.required<Transmission[]>();
  readonly changed = output<CarFilters>();

  protected setQuery(value: string): void {
    this.changed.emit({ ...this.filters(), query: value });
  }

  protected setTransmission(value: string): void {
    const t = this.transmissions().find((x) => x === value) ?? null;
    this.changed.emit({ ...this.filters(), transmission: t });
  }

  protected setNumber(key: 'priceMin' | 'priceMax' | 'yearMin', raw: string): void {
    const trimmed = raw.trim();
    const value = trimmed === '' ? null : Number(trimmed);
    const safe = value !== null && Number.isFinite(value) && value >= 0 ? value : null;
    this.changed.emit({ ...this.filters(), [key]: safe });
  }

  protected toggleList<K extends 'brands' | 'bodies' | 'fuels'>(key: K, value: string): void {
    const current = this.filters()[key] as string[];
    const next = current.includes(value) ? current.filter((x) => x !== value) : [...current, value];
    this.changed.emit({ ...this.filters(), [key]: next } as CarFilters);
  }

  protected isChecked(key: 'brands' | 'bodies' | 'fuels', value: string): boolean {
    return (this.filters()[key] as string[]).includes(value);
  }
}
