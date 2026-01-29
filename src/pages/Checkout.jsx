import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, Banknote } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 1999 ? 0 : 200;
  const total = subtotal + shipping;

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      clearCart();
      toast.success("Order placed successfully!");
      navigate('/'); // Redirect to home or success page
    }, 2000);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pt-12 pb-24 px-4 md:px-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-serif text-brand-charcoal mb-8 text-center">Secure Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <div>
          <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
          <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <Input required placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <Input required placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <Input required type="email" placeholder="jane@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <Input required placeholder="123 Luxury Lane" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">City</label>
                <Input required placeholder="Mumbai" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Pincode</label>
                <Input required placeholder="400001" />
              </div>
            </div>
          </form>
        </div>

        {/* Payment & Summary */}
        <div className="bg-gray-50 p-8 rounded-lg h-fit">
          <h2 className="text-xl font-medium mb-6">Payment Method</h2>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 p-4 border border-brand-primary/20 bg-white rounded-lg cursor-pointer ring-1 ring-brand-primary/20">
              <CreditCard className="w-5 h-5 text-brand-primary" />
              <span className="font-medium">Credit / Debit Card</span>
              <CheckCircle2 className="w-4 h-4 text-brand-primary ml-auto" />
            </div>
            <div className="flex items-center gap-3 p-4 border border-gray-200 bg-white rounded-lg opacity-50 cursor-not-allowed">
              <Banknote className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">Cash on Delivery (Disabled)</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
             <div className="flex justify-between mb-4 text-sm text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-brand-charcoal">
              <span>Total to Pay</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            form="checkout-form"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-brand-dark text-white h-12 rounded-full text-base"
          >
            {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
          </Button>

          <p className="text-xs text-gray-400 text-center mt-4">
            By placing this order, you agree to our Terms and Conditions.
            <br/>(This is a demo payment)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
