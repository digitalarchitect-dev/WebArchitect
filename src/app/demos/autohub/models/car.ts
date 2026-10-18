export type FuelType = 'Бензин' | 'Дизель' | 'Гибрид' | 'Электро';
export type Transmission = 'Автомат' | 'Механика';
export type BodyType = 'Седан' | 'Внедорожник' | 'Хетчбек' | 'Универсал';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: FuelType;
  transmission: Transmission;
  body: BodyType;
  power: number;
  engine: string;
  color: string;
  colorName: string;
  features: string[];
  description: string;
  photos: string[];
}

export interface CarFilters {
  query: string;
  brands: string[];
  bodies: BodyType[];
  fuels: FuelType[];
  transmission: Transmission | null;
  priceMin: number | null;
  priceMax: number | null;
  yearMin: number | null;
}

export type CarSort = 'relevance' | 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';

export const EMPTY_CAR_FILTERS: CarFilters = {
  query: '',
  brands: [],
  bodies: [],
  fuels: [],
  transmission: null,
  priceMin: null,
  priceMax: null,
  yearMin: null,
};
