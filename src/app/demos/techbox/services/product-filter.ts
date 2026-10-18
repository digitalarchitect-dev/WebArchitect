import { Product, ProductFilters, ProductSort } from '../models/product';

export function matchesFilters(product: Product, f: ProductFilters): boolean {
  const query = f.query.trim().toLowerCase();
  if (query) {
    const haystack = [product.name, product.brand, product.category, product.short]
      .join(' ')
      .toLowerCase();
    if (!query.split(/\s+/).every((word) => haystack.includes(word))) return false;
  }
  if (f.categories.length && !f.categories.includes(product.category)) return false;
  if (f.brands.length && !f.brands.includes(product.brand)) return false;
  if (f.priceMin !== null && product.price < f.priceMin) return false;
  if (f.priceMax !== null && product.price > f.priceMax) return false;
  if (f.inStockOnly && product.stock === 0) return false;
  if (f.minRating !== null && product.rating < f.minRating) return false;
  return true;
}

export function sortProducts(products: Product[], sort: ProductSort): Product[] {
  const copy = [...products];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case 'reviews-desc':
      return copy.sort((a, b) => b.reviews - a.reviews);
    default:
      return copy;
  }
}

export function filterAndSortProducts(
  products: Product[],
  filters: ProductFilters,
  sort: ProductSort,
): Product[] {
  return sortProducts(
    products.filter((product) => matchesFilters(product, filters)),
    sort,
  );
}

/** Уникальные названия характеристик в порядке появления, чтобы таблица сравнения была стабильной. */
export function specKeys(products: Product[]): string[] {
  const keys: string[] = [];
  for (const product of products) {
    for (const key of Object.keys(product.specs)) {
      if (!keys.includes(key)) keys.push(key);
    }
  }
  return keys;
}

/** Различается ли значение характеристики у сравниваемых товаров. */
export function specDiffers(products: Product[], key: string): boolean {
  const values = products.map((p) => p.specs[key] ?? null);
  return values.some((value) => value !== values[0]);
}

export function discountPercent(product: Product): number | null {
  if (!product.oldPrice || product.oldPrice <= product.price) return null;
  return Math.round((1 - product.price / product.oldPrice) * 100);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',');
}
