export type Category = 'Смартфоны' | 'Ноутбуки' | 'Аудио' | 'Консоли' | 'Аксессуары' | 'Дроны и камеры';

export const CATEGORIES: Category[] = [
  'Смартфоны',
  'Ноутбуки',
  'Аудио',
  'Консоли',
  'Аксессуары',
  'Дроны и камеры',
];

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  stock: number;
  badge: string | null;
  short: string;
  highlights: string[];
  specs: Record<string, string>;
  photos: string[];
}

export interface ProductFilters {
  query: string;
  categories: Category[];
  brands: string[];
  priceMin: number | null;
  priceMax: number | null;
  inStockOnly: boolean;
  minRating: number | null;
}

export type ProductSort = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc' | 'reviews-desc';

export const EMPTY_PRODUCT_FILTERS: ProductFilters = {
  query: '',
  categories: [],
  brands: [],
  priceMin: null,
  priceMax: null,
  inStockOnly: false,
  minRating: null,
};

export const PRODUCT_SORTS: ProductSort[] = [
  'relevance',
  'price-asc',
  'price-desc',
  'rating-desc',
  'reviews-desc',
];
