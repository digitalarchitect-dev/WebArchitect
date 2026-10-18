import { Car, EMPTY_CAR_FILTERS } from '../models/car';
import { filterAndSortCars } from './car-filter';

const cars: Car[] = [
  makeCar({ id: 'a', brand: 'Toyota', model: 'Camry', year: 2021, price: 2000000, mileage: 50000, fuel: 'Бензин', transmission: 'Автомат', body: 'Седан' }),
  makeCar({ id: 'b', brand: 'BMW', model: 'X5', year: 2020, price: 5000000, mileage: 60000, fuel: 'Дизель', transmission: 'Автомат', body: 'Внедорожник' }),
  makeCar({ id: 'c', brand: 'Volkswagen', model: 'Polo', year: 2016, price: 700000, mileage: 130000, fuel: 'Бензин', transmission: 'Механика', body: 'Седан' }),
];

function makeCar(partial: Partial<Car> & Pick<Car, 'id' | 'brand' | 'model'>): Car {
  return {
    year: 2020,
    price: 1000000,
    mileage: 0,
    fuel: 'Бензин',
    transmission: 'Автомат',
    body: 'Седан',
    power: 100,
    engine: '1.6 л',
    color: '#000000',
    colorName: 'Чёрный',
    features: [],
    description: '',
    ...partial,
  };
}

describe('filterAndSortCars', () => {
  it('returns all cars with empty filters', () => {
    expect(filterAndSortCars(cars, EMPTY_CAR_FILTERS, 'relevance').length).toBe(3);
  });

  it('matches every word of the query against brand, model and year', () => {
    const result = filterAndSortCars(cars, { ...EMPTY_CAR_FILTERS, query: 'bmw x5' }, 'relevance');
    expect(result.map((c) => c.id)).toEqual(['b']);
  });

  it('is case-insensitive for search', () => {
    const result = filterAndSortCars(cars, { ...EMPTY_CAR_FILTERS, query: 'CAMRY' }, 'relevance');
    expect(result.map((c) => c.id)).toEqual(['a']);
  });

  it('combines price range with body filter', () => {
    const result = filterAndSortCars(
      cars,
      { ...EMPTY_CAR_FILTERS, bodies: ['Седан'], priceMin: 1500000 },
      'relevance',
    );
    expect(result.map((c) => c.id)).toEqual(['a']);
  });

  it('filters by transmission and year', () => {
    const result = filterAndSortCars(
      cars,
      { ...EMPTY_CAR_FILTERS, transmission: 'Механика', yearMin: 2010 },
      'relevance',
    );
    expect(result.map((c) => c.id)).toEqual(['c']);
  });

  it('sorts by price ascending and descending without mutating input', () => {
    const asc = filterAndSortCars(cars, EMPTY_CAR_FILTERS, 'price-asc');
    expect(asc.map((c) => c.id)).toEqual(['c', 'a', 'b']);
    const desc = filterAndSortCars(cars, EMPTY_CAR_FILTERS, 'price-desc');
    expect(desc.map((c) => c.id)).toEqual(['b', 'a', 'c']);
    expect(cars.map((c) => c.id)).toEqual(['a', 'b', 'c']);
  });

  it('returns empty list when nothing matches', () => {
    expect(filterAndSortCars(cars, { ...EMPTY_CAR_FILTERS, query: 'tesla' }, 'relevance')).toEqual([]);
  });
});
