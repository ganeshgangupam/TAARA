import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { User, ShieldCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (role) => {
    login(role);
    if (role === 'admin') {
      toast.success('Welcome back, Admin');
      navigate('/admin/dashboard');
    } else {
      toast.success('Welcome back, Ananya');
      navigate('/');
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="text-3xl font-serif text-brand-charcoal">Welcome Back</h2>
          <p className="mt-2 text-gray-500">Please select your login type</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mt-8">
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 hover:bg-brand-primary/5 hover:text-brand-primary border-gray-200 hover:border-brand-primary transition-all group"
            onClick={() => handleLogin('customer')}
          >
            <User className="w-8 h-8 text-gray-400 group-hover:text-brand-primary" />
            <span className="text-lg font-medium">Customer Login</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 hover:bg-brand-primary/5 hover:text-brand-primary border-gray-200 hover:border-brand-primary transition-all group"
            onClick={() => handleLogin('admin')}
          >
            <ShieldCheck className="w-8 h-8 text-gray-400 group-hover:text-brand-primary" />
            <span className="text-lg font-medium">Admin Login</span>
          </Button>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          This is a demo application. No password required.
        </p>
      </div>
    </div>
  );
};

export default Login;
