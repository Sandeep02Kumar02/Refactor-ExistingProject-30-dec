/**
 * Order store using Zustand
 * Manages order state including creating orders and tracking order history
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderState, Order } from '../types';

// Generate unique ID
const generateId = (): string => {
  return 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Simulate API delay
const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,

      createOrder: async (orderData: Partial<Order>): Promise<Order> => {
        set({ isLoading: true, error: null });

        try {
          await simulateApiDelay();

          const newOrder: Order = {
            id: generateId(),
            userId: orderData.userId || 'guest',
            items: orderData.items || [],
            subtotal: orderData.subtotal || 0,
            tax: orderData.tax || 0,
            total: orderData.total || 0,
            status: 'confirmed',
            orderType: orderData.orderType || 'pickup',
            deliveryAddress: orderData.deliveryAddress,
            specialInstructions: orderData.specialInstructions,
            createdAt: new Date(),
            estimatedTime: orderData.orderType === 'delivery' ? 45 : 20,
          };

          set((state) => ({
            orders: [newOrder, ...state.orders],
            currentOrder: newOrder,
            isLoading: false,
            error: null,
          }));

          return newOrder;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to create order',
          });
          throw error;
        }
      },

      getOrders: async (): Promise<void> => {
        set({ isLoading: true, error: null });

        try {
          await simulateApiDelay(500);
          // In a real app, this would fetch from an API
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch orders',
          });
        }
      },

      clearCurrentOrder: (): void => {
        set({ currentOrder: null });
      },
    }),
    {
      name: 'burger-order-storage',
    }
  )
);
