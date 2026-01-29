import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product, size) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id && item.selectedSize === size);
        if (existing) {
          return {
            cart: state.cart.map(item => 
              (item.id === product.id && item.selectedSize === size)
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, selectedSize: size, quantity: 1 }] };
      }),
      removeFromCart: (id, size) => set((state) => ({
        cart: state.cart.filter(item => !(item.id === id && item.selectedSize === size))
      })),
      updateQuantity: (id, size, quantity) => set((state) => ({
        cart: state.cart.map(item => 
          (item.id === id && item.selectedSize === size)
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'taara-cart',
    }
  )
)
