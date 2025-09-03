'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface CartProps {
  onClose?: () => void;
}

// Simple SVG icons
const Trash = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Plus = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const Minus = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
  </svg>
);

export const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between py-4">
          <h2 className="text-lg font-semibold text-white">Your Cart</h2>
          <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </Button>
        </div>
        <Separator className="bg-gray-700" />
        
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6.5 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.5" />
            </svg>
          </div>
          <h3 className="text-white font-medium mb-2">Your cart is empty</h3>
          <p className="text-gray-400 mb-6">Add some products to get started</p>
          <Link href="/">
            <Button onClick={onClose} className="bg-white text-black hover:bg-gray-200">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <h2 className="text-lg font-semibold text-white">Your Cart ({cart.itemCount})</h2>
        <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
          ×
        </Button>
      </div>
      <Separator className="bg-gray-700" />

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.product.id} className="flex gap-4 p-3 bg-gray-900 rounded-lg">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yMCAyNEwyNCAxNkw0NCAzMkwyOCA0MEwyMCAyNFoiIGZpbGw9IiM2Mzc0OEIiLz4KPC9zdmc+';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm mb-1 truncate">
                  {item.product.name}
                </h4>
                <p className="text-gray-400 text-xs mb-2">{item.product.category}</p>
                <p className="text-white font-semibold">${item.product.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-gray-400 hover:text-red-400 p-1 h-6 w-6"
                >
                  <Trash />
                </Button>
                
                <div className="flex items-center gap-2 my-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="text-gray-400 hover:text-white p-1 h-6 w-6"
                    disabled={item.quantity <= 1}
                  >
                    <Minus />
                  </Button>
                  
                  <span className="text-white text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="text-gray-400 hover:text-white p-1 h-6 w-6"
                  >
                    <Plus />
                  </Button>
                </div>

                <p className="text-white text-sm font-semibold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 pt-4 space-y-4">
        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">Total:</span>
          <span className="text-white font-bold text-xl">
            ${cart.total.toFixed(2)}
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Link href="/checkout" className="block">
            <Button onClick={onClose} className="w-full bg-white text-black hover:bg-gray-200">
              Proceed to Checkout
            </Button>
          </Link>
          
          <Button
            variant="outline"
            onClick={clearCart}
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};