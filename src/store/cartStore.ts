/**
 * Shopping Cart store using Zustand
 * Manages cart state including adding, removing, and updating items
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState, MenuItem, CartItem } from '../types';

const TAX_RATE = 0.08; // 8% tax rate

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (menuItem: MenuItem, quantity: number = 1, instructions?: string): void => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.menuItem.id === menuItem.id
          );

          if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
              specialInstructions: instructions || updatedItems[existingItemIndex].specialInstructions,
            };
            return { items: updatedItems };
          }

          // Add new item
          const newItem: CartItem = {
            menuItem,
            quantity,
            specialInstructions: instructions,
          };
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (itemId: string): void => {
        set((state) => ({
          items: state.items.filter((item) => item.menuItem.id !== itemId),
        }));
      },

      updateQuantity: (itemId: string, quantity: number): void => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.menuItem.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: (): void => {
        set({ items: [] });
      },

      getSubtotal: (): number => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.menuItem.price * item.quantity,
          0
        );
      },

      getTax: (): number => {
        const subtotal = get().getSubtotal();
        return subtotal * TAX_RATE;
      },

      getTotal: (): number => {
        return get().getSubtotal() + get().getTax();
      },

      getItemCount: (): number => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'burger-cart-storage',
    }
  )
);
