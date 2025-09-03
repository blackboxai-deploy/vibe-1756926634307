// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  images?: string[];
  inStock: boolean;
  stockQuantity?: number;
  features?: string[];
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Payment Types
export interface PaymentProvider {
  id: string;
  name: string;
  enabled: boolean;
  config?: Record<string, any>;
}

export interface PaymentMethod {
  provider: string;
  type: 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto';
  data?: Record<string, any>;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  customerInfo: {
    name: string;
    email: string;
    address?: string;
    phone?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Cart Context Types
export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  status: number;
}

export type Category = 'Clothes' | 'Mugs' | 'Bottles' | 'Notebooks' | 'Phone Covers';

export interface CategoryFilter {
  category: Category;
  count: number;
  active: boolean;
}