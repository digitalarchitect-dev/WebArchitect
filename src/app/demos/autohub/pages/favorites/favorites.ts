import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../models/car';
import { CarCard } from '../../components/car-card/car-card';
import { Favorites as FavoritesStore } from '../../services/favorites';

@Component({
  selector: 'app-autohub-favorites',
  imports: [RouterLink, CarCard],
  templateUrl: './favorites.html',
})
export class Favorites {
  protected readonly store = inject(FavoritesStore);
  protected readonly carsResource = httpResource<Car[]>(() => 'demo-data/autohub/cars.json');
  protected readonly cars = computed(() => {
    const ids = this.store.ids();
    return (this.carsResource.value() ?? []).filter((c) => ids.includes(c.id));
  });

  protected remove(car: Car): void {
    this.store.toggle(car.id);
  }
}
