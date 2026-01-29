import React from 'react';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, ChevronLeft, ChevronRight, Star, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, handleLogout }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-100 fixed h-full hidden md:flex flex-col z-20 transition-all duration-300 ease-in-out shadow-sm",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        <div className={cn("flex items-center gap-2 overflow-hidden whitespace-nowrap", isCollapsed && "justify-center w-full")}>
          <div className="relative flex-shrink-0">
            <Star className="w-6 h-6 text-brand-primary fill-brand-primary/20" />
          </div>
          {!isCollapsed && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-brand-charcoal tracking-tight"
            >
              TAARA Admin
            </motion.h1>
          )}
        </div>
        
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative",
              activeTab === tab.id 
                ? "bg-brand-charcoal text-white shadow-md shadow-brand-charcoal/20" 
                : "text-gray-500 hover:bg-gray-50 hover:text-brand-charcoal",
              isCollapsed && "justify-center px-2"
            )}
            title={isCollapsed ? tab.label : undefined}
          >
            <tab.icon className={cn("w-5 h-5 flex-shrink-0", activeTab === tab.id ? "text-white" : "text-gray-500 group-hover:text-brand-charcoal")} />
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {tab.label}
              </motion.span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {tab.label}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        {isCollapsed ? (
          <button 
            onClick={() => setIsCollapsed(false)}
            className="w-full flex justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-500 mb-2"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : null}
        
        <Link to="/" className={cn(
            "w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors",
            isCollapsed && "justify-center"
          )}
          title={isCollapsed ? "Public Website" : undefined}>
          <ExternalLink className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Public Website</span>}
        </Link>

        <button 
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-2",
            isCollapsed && "justify-center"
          )}
          title={isCollapsed ? "Sign Out" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;