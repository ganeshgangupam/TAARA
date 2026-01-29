import React from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';

const NewArrivals = () => {
  const newProducts = products.filter(p => p.isNew);

  return (
    <div className="pt-8 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="text-left mb-12">
        <h1 className="text-4xl font-serif italic text-brand-charcoal mb-4">New Arrivals</h1>
        <p className="text-gray-500 max-w-lg">
          Discover the latest additions to our curated collection. Fresh styles, just for you.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {newProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {newProducts.length === 0 && (
          <div className="text-center py-24 text-gray-400">
              No new arrivals at the moment. Check back soon!
          </div>
      )}
    </div>
  );
};

export default NewArrivals;