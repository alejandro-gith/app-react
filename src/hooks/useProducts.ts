import { useState, useEffect } from 'react';
import type { Product } from '../core/models/Product';
import type { IProductService } from '../core/services/IProductService';

export const useProducts = (productService: IProductService) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message || 'Error al cargar productos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [productService]);

  return { products, loading, error };
};