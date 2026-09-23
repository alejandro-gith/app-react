import type { Product } from '../models/Product';

export interface IProductService {
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product>;
}