import type { IHttpClient } from '../core/services/IHttpClient';
import type { IProductService } from '../core/services/IProductService';
import type { Product } from '../core/models/Product';

export class FakeStoreProductService implements IProductService {
  private readonly baseUrl = 'https://fakestoreapi.com/products';
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getProducts(): Promise<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  async getProductById(id: number): Promise<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }
}