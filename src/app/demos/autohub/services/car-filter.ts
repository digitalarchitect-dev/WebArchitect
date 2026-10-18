import { Car, CarFilters, CarSort } from '../models/car';

export function matchesFilters(car: Car, f: CarFilters): boolean {
  const query = f.query.trim().toLowerCase();
  if (query) {
    const haystack = `${car.brand} ${car.model} ${car.year} ${car.body} ${car.fuel}`.toLowerCase();
    if (!query.split(/\s+/).every((word) => haystack.includes(word))) return false;
  }
  if (f.brands.length && !f.brands.includes(car.brand)) return false;
  if (f.bodies.length && !f.bodies.includes(car.body)) return false;
  if (f.fuels.length && !f.fuels.includes(car.fuel)) return false;
  if (f.transmission && car.transmission !== f.transmission) return false;
  if (f.priceMin !== null && car.price < f.priceMin) return false;
  if (f.priceMax !== null && car.price > f.priceMax) return false;
  if (f.yearMin !== null && car.year < f.yearMin) return false;
  return true;
}

export function sortCars(cars: Car[], sort: CarSort): Car[] {
  const copy = [...cars];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'year-desc':
      return copy.sort((a, b) => b.year - a.year);
    case 'mileage-asc':
      return copy.sort((a, b) => a.mileage - b.mileage);
    default:
      return copy;
  }
}

export function filterAndSortCars(cars: Car[], filters: CarFilters, sort: CarSort): Car[] {
  return sortCars(
    cars.filter((car) => matchesFilters(car, filters)),
    sort,
  );
}
