import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminTopbar = ({ title, isCollapsed }) => {
  return (
    <header 
      className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800 capitalize hidden sm:block">{title}</h2>
      </div>

      <div className="flex items-center gap-6 flex-1 justify-end max-w-2xl">
        <div className="relative w-full max-w-md hidden md:block">
          <Input 
            type="text" 
            placeholder="Search here..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-brand-primary/20 transition-all duration-300 rounded-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-brand-charcoal hover:bg-gray-50 rounded-full">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
          
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-brand-charcoal">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-charcoal text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-black transition-colors">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
