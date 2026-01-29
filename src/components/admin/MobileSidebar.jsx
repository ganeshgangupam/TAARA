import React from 'react';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, X, Star, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileSidebar = ({ activeTab, setActiveTab, isOpen, onClose, handleLogout }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          {/* Sidebar Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 md:hidden flex flex-col shadow-xl"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-brand-primary fill-brand-primary/20" />
                <span className="text-lg font-bold text-brand-charcoal tracking-tight">TAARA Admin</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    onClose();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                    activeTab === tab.id 
                      ? "bg-brand-charcoal text-white shadow-md shadow-brand-charcoal/20" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-brand-charcoal"
                  )}
                >
                  <tab.icon className={cn("w-5 h-5 flex-shrink-0", activeTab === tab.id ? "text-white" : "text-gray-500")} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 border-t border-gray-100 space-y-2">
              <Link 
                to="/" 
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Public Website
              </Link>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
