import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Search, ShoppingBag, Heart, User, LogOut, Repeat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import LoginModal from '@/components/auth/LoginModal';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const { user, isAuthenticated, logout, login } = useAuthStore();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSwitchRole = () => {
    if (user?.role === 'admin') {
      login('customer');
      navigate('/');
    } else {
      login('admin');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="w-full font-sans">
      {/* Top Strip */}
      <div className="bg-brand-primary text-white text-xs py-2 px-4 md:px-8 flex justify-between items-center tracking-wide">
        <Link to="/collections?sort=newest" className="hover:underline">New Arrivals Live</Link>
        <span>Free Shipping Above ₹1999</span>
      </div>

      {/* Main Header */}
      <header className="bg-white py-4 px-4 md:px-8 border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Star className="w-6 h-6 text-brand-primary fill-brand-primary/20 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-charcoal">TAARA</span>
          </Link>

          {/* Search Bar - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Input 
              type="text" 
              placeholder="Search collections, styles..." 
              className="pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-brand-primary/20 transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-charcoal/80">
            <Link to="/explore" className="hover:text-brand-primary transition-colors">Explore</Link>
            <Link to="/collections" className="hover:text-brand-primary transition-colors">Collections</Link>
            <Link to="/about" className="hover:text-brand-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-brand-primary transition-colors">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/register">
                    <Button variant="ghost" className="text-brand-charcoal font-medium">Sign Up</Button>
                  </Link>
                  <Button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="bg-brand-charcoal text-white hover:bg-black px-6"
                  >
                    Log In
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-brand-charcoal">
                    <User className="w-4 h-4" />
                    <span>{user?.role === 'admin' ? 'Admin' : 'My Account'}</span>
                  </div>
                  
                  {user?.role === 'admin' && (
                    <Link to="/admin/dashboard">
                      <Button variant="outline" size="sm" className="h-8">Dashboard</Button>
                    </Link>
                  )}
                  
                  {/* Role Switch Button (Only for testing/demo) */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSwitchRole}
                    className="h-8 text-xs flex items-center gap-1 text-brand-primary"
                    title={user?.role === 'admin' ? "Switch to Customer View" : "Switch to Admin View"}
                  >
                    <Repeat className="w-3 h-3" />
                    {user?.role === 'admin' ? 'Customer View' : 'Admin View'}
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={logout}
                    className="text-gray-500 hover:text-red-600"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-3">
               <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className="p-1">
                 {isMobileSearchOpen ? (
                   <X className="w-5 h-5 text-gray-600" />
                 ) : (
                   <Search className="w-5 h-5 text-gray-600" />
                 )}
               </button>
               
               {!isAuthenticated ? (
                 <button onClick={() => setIsLoginModalOpen(true)} className="p-1">
                   <User className="w-5 h-5 text-gray-600" />
                 </button>
               ) : (
                 <div className="flex items-center gap-2">
                   {user?.role === 'admin' && (
                      <Link to="/admin/dashboard" className="p-1">
                        <User className="w-5 h-5 text-brand-primary" />
                      </Link>
                   )}
                   {user?.role !== 'admin' && (
                      <button onClick={logout} className="p-1">
                        <LogOut className="w-5 h-5 text-gray-600" />
                      </button>
                   )}
                 </div>
               )}
            </div>

            <Link to="/wishlist" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-primary text-white text-[10px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar Animation */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-sm"
          >
            <div className="p-4 container mx-auto">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search for luxury items..." 
                  className="pl-10 pr-4 py-6 bg-gray-50 border-transparent focus:bg-white focus:border-brand-primary/20 transition-all duration-300 w-full text-base rounded-xl"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

export default Header;
