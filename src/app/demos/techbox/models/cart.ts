export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  brand: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  cityAddress: string;
}

export type DeliveryMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'card' | 'cash';

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  customer: OrderCustomer;
  delivery: DeliveryMethod;
  payment: PaymentMethod;
  status: 'demo';
  createdAt: string;
}
