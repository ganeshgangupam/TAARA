import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col gap-3">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
        {product.isNew && (
          <span className="absolute top-3 left-3 z-10 bg-brand-primary text-white text-[10px] uppercase tracking-wider px-2 py-1 font-medium">
            New Arrival
          </span>
        )}
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-brand-charcoal">
          <Heart className="w-4 h-4" />
        </button>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>
        {/* Quick Add Button (Optional, appears on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button className="w-full bg-white/90 text-brand-charcoal hover:bg-white backdrop-blur-md shadow-sm">
                Add to Bag
            </Button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1">
        <h3 className="font-medium text-brand-charcoal text-lg">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="font-medium text-brand-primary">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
