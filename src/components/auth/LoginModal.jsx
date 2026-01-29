import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { User, ShieldCheck, X } from 'lucide-react';
import { toast } from 'sonner';

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  if (!isOpen) return null;

  const handleLogin = (role) => {
    login(role);
    onClose();
    
    if (role === 'admin') {
      toast.success('Welcome back, Admin');
      navigate('/admin/dashboard');
    } else {
      toast.success('Welcome back, Ananya');
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-brand-charcoal mb-2">Welcome to TAARA</h2>
          <p className="text-gray-500 text-sm">Select your login type to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('customer')}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-brand-primary hover:bg-brand-offWhite transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-full bg-brand-offWhite group-hover:bg-white flex items-center justify-center text-brand-charcoal transition-colors">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-brand-charcoal">Customer Login</h3>
              <p className="text-xs text-gray-500">Shop collections, track orders & more</p>
            </div>
          </button>

          <button
            onClick={() => handleLogin('admin')}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-brand-primary hover:bg-brand-offWhite transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-full bg-brand-offWhite group-hover:bg-white flex items-center justify-center text-brand-charcoal transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-brand-charcoal">Admin Access</h3>
              <p className="text-xs text-gray-500">Manage products, orders & dashboard</p>
            </div>
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            By logging in, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
