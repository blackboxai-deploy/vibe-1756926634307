'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartContextType, CartItem, Product } from '@/types';

// Cart Actions
type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; cart: Cart }
  | { type: 'SET_LOADING'; loading: boolean };

// Initial Cart State
const initialCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Cart Reducer
const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        item => item.product.id === action.product.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.product, quantity: action.quantity }];
      }

      const newTotal = newItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      const newItemCount = newItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(
        item => item.product.id !== action.productId
      );
      const newTotal = newItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      const newItemCount = newItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId });
      }

      const newItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      const newTotal = newItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      const newItemCount = newItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }

    case 'CLEAR_CART':
      return initialCart;

    case 'LOAD_CART':
      return action.cart;

    default:
      return state;
  }
};

// Context State Interface
interface CartContextState {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

// Create Context
const CartContext = createContext<CartContextState | undefined>(undefined);

// Local Storage Key
const CART_STORAGE_KEY = 'nader-cart';

// Cart Provider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', cart: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isLoading]);

  // Cart Actions
  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextState = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom Hook
export const useCart = (): CartContextState => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};