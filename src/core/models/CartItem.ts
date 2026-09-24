import type { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

// Estructura requerida por la FakeStoreAPI para simular el POST /carts
export interface CartRequestPayload {
  userId: number;
  date: string;
  products: Array<{
    productId: number;
    quantity: number;
  }>;
}