import React, { useState } from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const Collections = () => {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = filterCategory === 'All' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  return (
    <div className="pt-8 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-serif italic text-brand-charcoal mb-4">The Collections</h1>
          <p className="text-gray-500 max-w-lg">
            Explore our meticulously crafted pieces, designed to bring out the star in you.
          </p>
        </div>
        
        {/* Simple Filter */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <SlidersHorizontal className="w-5 h-5 text-gray-400 hidden md:block" />
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${
                        filterCategory === cat 
                        ? 'bg-brand-charcoal text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-gray-400">
              No products found in this category.
          </div>
      )}
    </div>
  );
};

export default Collections;
