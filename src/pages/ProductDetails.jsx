import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(null);
  
  const addToCart = useCartStore(state => state.addToCart);

  if (!product) {
    return <div className="min-h-[50vh] flex items-center justify-center">Product not found</div>;
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart(product, selectedSize);
    toast.success("Added to bag");
  };

  return (
    <div className="pt-8 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <Link to="/collections" className="inline-flex items-center text-gray-500 hover:text-brand-charcoal mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collections
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Image Gallery (Simplified for demo) */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1.5s] ease-in-out cursor-zoom-in"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <span className="text-brand-primary font-medium tracking-wider text-sm uppercase mb-2">{product.category}</span>
          <h1 className="text-4xl font-serif text-brand-charcoal mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-900 mb-8">₹{product.price.toLocaleString()}</p>
          
          <div className="h-px bg-gray-100 w-full mb-8" />

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description} Crafted with meticulous attention to detail, this piece embodies the essence of luxury and comfort.
          </p>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-brand-charcoal">Select Size</span>
              <button className="text-xs text-gray-500 underline">Size Guide</button>
            </div>
            <div className="flex gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                    selectedSize === size
                      ? 'bg-brand-charcoal text-white border-brand-charcoal'
                      : 'bg-white text-brand-charcoal border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-12">
            <Button 
              size="lg" 
              className="flex-1 h-14 text-base bg-brand-charcoal hover:bg-black rounded-full"
              onClick={handleAddToBag}
            >
              Add to Bag
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-6 rounded-full border-gray-300"
            >
              <Star className="w-5 h-5" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Truck className="w-5 h-5 text-brand-primary" />
              <span>Free Shipping above ₹1999</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
              <span>Authentic Luxury Quality</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
