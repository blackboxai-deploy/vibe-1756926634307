'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addToCart(product, 1);
      toast.success(`${product.name} added to cart!`, {
        description: `$${product.price} - Quantity: 1`
      });
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden border-gray-700 bg-gray-900 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-white/5">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-800">
          <Link href={`/products/${product.id}`}>
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">{product.name}</p>
                </div>
              </div>
            )}
          </Link>
          
          {/* Stock Badge */}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
          
          {/* Category Badge */}
          <Badge variant="secondary" className="absolute top-2 left-2 bg-black/50 text-white">
            {product.category}
          </Badge>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-white">
              ${product.price}
            </span>
            
            {product.stockQuantity && product.stockQuantity <= 10 && product.inStock && (
              <Badge variant="outline" className="text-orange-400 border-orange-400">
                Only {product.stockQuantity} left
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
              View Details
            </Button>
          </Link>
          
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className="flex-1 bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Adding...
              </div>
            ) : (
              'Add to Cart'
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};