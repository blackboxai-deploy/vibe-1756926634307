'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, getCategories, searchProducts } from '@/lib/products';
import { Category } from '@/types';
import Link from 'next/link';

export default function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = getCategories();

  // Filter products based on search and category
  useEffect(() => {
    setIsLoading(true);
    
    let filtered = products;
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery);
    }
    
    // Apply category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    setFilteredProducts(filtered);
    setIsLoading(false);
  }, [searchQuery, activeCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: Category | 'All') => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onSearch={handleSearch} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-widest bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              NADER
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
              At <span className="font-bold text-white">NADER</span>, we believe elegance is found in the essentials.  
              From clothing to mugs, bottles, phone covers, and notebooks — each piece 
              is designed with a bold, luxurious touch to make your everyday extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-black text-lg rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              >
                Explore Collection
              </Button>
              <Link href="/about">
                <Button variant="outline" className="px-8 py-3 border-gray-600 text-gray-300 text-lg rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Essentials</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our carefully curated collection of luxury everyday items, 
              each designed to bring sophistication to your daily routine.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge
              variant={activeCategory === 'All' ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-2 text-sm transition-all duration-300 ${
                activeCategory === 'All'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              onClick={() => handleCategoryFilter('All')}
            >
              All Products ({products.length})
            </Badge>
            
            {categories.map((category) => (
              <Badge
                key={category.category}
                variant={activeCategory === category.category ? 'default' : 'outline'}
                className={`cursor-pointer px-4 py-2 text-sm transition-all duration-300 ${
                  activeCategory === category.category
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => handleCategoryFilter(category.category as Category)}
              >
                {category.category} ({category.count})
              </Badge>
            ))}
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-center mb-8">
              <p className="text-gray-400">
                Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
                {activeCategory !== 'All' && ` in ${activeCategory}`}
              </p>
              <Button 
                variant="ghost" 
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-white mt-2"
              >
                Clear search
              </Button>
            </div>
          )}

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-800"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-800 rounded mb-3"></div>
                    <div className="h-4 bg-gray-800 rounded mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-3/4 mb-4"></div>
                    <div className="h-10 bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-400 mb-4">
                {searchQuery 
                  ? `No products match "${searchQuery}"${activeCategory !== 'All' ? ` in ${activeCategory}` : ''}`
                  : `No products available in ${activeCategory}`
                }
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose NADER?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the difference that quality craftsmanship and attention to detail make.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-400">
                Every item is crafted with the finest materials and meticulous attention to detail.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Minimalist Design</h3>
              <p className="text-gray-400">
                Clean, elegant designs that complement your lifestyle and personal aesthetic.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fair Pricing</h3>
              <p className="text-gray-400">
                Luxury doesn't have to break the bank. Quality at prices that make sense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold tracking-widest mb-2">NADER</h3>
            <p className="text-gray-400">Elegance in Every Essential</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Pinterest
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 NADER — All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}