import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleMoveToCart = (product) => {
    addToCart(product, 'M'); // Defaulting to M size for simplicity
    removeFromWishlist(product.id);
    toast.success('Moved to bag');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif text-brand-charcoal mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8">Save your favorite styles to review them later.</p>
        <Link to="/collections">
          <Button className="bg-brand-charcoal text-white px-8 py-6 rounded-none text-lg">
            Explore Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl font-serif text-brand-charcoal mb-12 text-center">My Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="text-lg font-medium text-brand-charcoal">{product.name}</h3>
            <p className="text-gray-500 mb-4">₹{product.price.toLocaleString()}</p>
            
            <Button 
              onClick={() => handleMoveToCart(product)}
              className="w-full bg-white border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-colors"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Move to Bag
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
