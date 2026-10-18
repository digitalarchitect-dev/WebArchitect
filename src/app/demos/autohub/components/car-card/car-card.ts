import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { formatNumber, formatRub } from '../../../../shared/money';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-card',
  imports: [RouterLink],
  templateUrl: './car-card.html',
})
export class CarCard {
  readonly car = input.required<Car>();
  readonly favorite = input(false);
  readonly priority = input(false);
  readonly favoriteToggle = output<Car>();

  protected readonly formatRub = formatRub;
  protected readonly formatNumber = formatNumber;
}
