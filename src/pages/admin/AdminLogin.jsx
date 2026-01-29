import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Star } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@taara.com' && password === 'admin') {
      login('admin');
      toast.success('Welcome back, Admin');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials (try: admin@taara.com / admin)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm">
        <div className="flex justify-center mb-8">
          <Star className="w-8 h-8 text-brand-primary fill-brand-primary/20" />
        </div>
        <h1 className="text-2xl font-serif text-center text-brand-charcoal mb-2">Admin Login</h1>
        <p className="text-gray-500 text-center mb-8">Sign in to manage your boutique</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <Input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@taara.com" 
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••" 
              required
            />
          </div>
          <Button className="w-full bg-brand-charcoal text-white h-10">Sign In</Button>
        </form>
        
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Demo Credentials:</p>
          <p>Email: admin@taara.com</p>
          <p>Password: admin</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
