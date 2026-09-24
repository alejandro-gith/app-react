import { useState, useEffect } from 'react';
import type { Product } from '../core/models/Product';
import type { CartItem } from '../core/models/CartItem';
import { FakeStoreCartService } from '../services/FakeStoreCartService';

const cartService = new FakeStoreCartService();

export const useCart = () => {
  // Inicializar el estado leyendo la memoria local
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const localData = localStorage.getItem('cart_data');
    return localData ? JSON.parse(localData) : [];
  });

  // Sincronizar el estado con localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart_data', JSON.stringify(cartItems));
  }, [cartItems]);

  const addProductToCart = async (product: Product, quantity: number) => {
    try {
      // Petición POST a la FakeStoreAPI
      await cartService.addToCart({
        userId: 1, // Simulando un ID de usuario activo
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: product.id, quantity }]
      });

      // Lógica de estado local: evitar duplicados y sumar cantidades
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.product.id === product.id);
        
        if (existingItem) {
          return prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        
        return [...prevItems, { product, quantity }];
      });

      return { success: true, message: 'Producto añadido al carrito exitosamente' };
    } catch (error) {
      return { success: false, message: 'Ocurrió un error al intentar agregar el producto' };
    }
  };

  return { cartItems, addProductToCart };
};