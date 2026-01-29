import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 1999 ? 0 : 200;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif text-brand-charcoal mb-4">Your Bag is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any stars to your collection yet.</p>
        <Link to="/collections">
          <Button className="bg-brand-charcoal text-white px-8 rounded-full">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-12 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-serif text-brand-charcoal mb-12">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 border-b border-gray-100 pb-8">
              <div className="w-24 h-32 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-brand-charcoal">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                    <p className="text-gray-500 text-sm mt-1">Size: {item.selectedSize}</p>
                  </div>
                  <p className="font-medium text-lg">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className="text-gray-500 hover:text-brand-charcoal"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className="text-gray-500 hover:text-brand-charcoal"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-lg sticky top-24">
            <h3 className="text-xl font-medium mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Inclusive of all taxes</p>
            </div>

            <Link to="/checkout" className="block w-full">
              <Button className="w-full bg-brand-charcoal hover:bg-black text-white h-12 rounded-full text-base">
                Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
