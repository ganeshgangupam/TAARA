import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      addToWishlist: (product) => set((state) => {
        const exists = state.wishlist.find((item) => item.id === product.id);
        if (exists) return state;
        return { wishlist: [...state.wishlist, product] };
      }),
      removeFromWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== id),
      })),
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'taara-wishlist',
    }
  )
);
