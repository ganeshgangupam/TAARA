import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // null | { role: 'customer' | 'admin', name: string }
      isAuthenticated: false,
      
      login: (role) => {
        const userData = role === 'admin' 
          ? { role: 'admin', name: 'Admin User' }
          : { role: 'customer', name: 'Ananya Gupta' }; // Dummy customer name
        
        // Set local storage for admin if needed by legacy code (AdminDashboard.jsx checks localStorage)
        if (role === 'admin') {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.removeItem('isAdmin');
        }
        
        set({ user: userData, isAuthenticated: true });
      },
      
      logout: () => {
        localStorage.removeItem('isAdmin');
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'taara-auth',
    }
  )
);
