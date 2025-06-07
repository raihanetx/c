
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Product, CartItem, Order, OrderStatus, ProductCategoryName } from '../types';
import { ALL_PRODUCTS } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';

interface AppContextType {
  products: Product[];
  categories: ProductCategoryName[];
  cart: CartItem[];
  orders: Order[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  placeOrder: (orderDetails: Omit<Order, 'id' | 'items' | 'totalAmount' | 'orderDate' | 'status'>) => Order | null;
  getOrderByID: (orderId: string) => Order | undefined;
  getProductById: (productId: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategoryName) => Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(ALL_PRODUCTS);
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = Object.values(ProductCategoryName);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  }, [setCart]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, [setCart]);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  }, [setCart, removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const placeOrder = useCallback((orderDetails: Omit<Order, 'id' | 'items' | 'totalAmount' | 'orderDate' | 'status'>): Order | null => {
    if (cart.length === 0) return null;
    const newOrder: Order = {
      ...orderDetails,
      id: crypto.randomUUID(),
      items: [...cart],
      totalAmount: getCartTotal(),
      orderDate: new Date().toISOString(),
      status: OrderStatus.PENDING_PAYMENT,
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
    return newOrder;
  }, [cart, getCartTotal, setOrders, clearCart]);

  const getOrderByID = useCallback((orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  }, [orders]);
  
  const getProductById = useCallback((productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  }, [products]);

  const getProductsByCategory = useCallback((category: ProductCategoryName): Product[] => {
    return products.filter(p => p.category === category);
  }, [products]);

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        cart,
        orders,
        searchTerm,
        setSearchTerm,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        placeOrder,
        getOrderByID,
        getProductById,
        getProductsByCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
    