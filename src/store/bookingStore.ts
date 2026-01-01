/**
 * Table Booking store using Zustand
 * Manages booking state including creating and managing table reservations
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookingState, TableBooking, BookingFormData } from '../types';

// Generate unique ID
const generateId = (): string => {
  return 'BKG-' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Simulate API delay
const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: [],
      currentBooking: null,
      isLoading: false,
      error: null,

      createBooking: async (bookingData: BookingFormData): Promise<TableBooking> => {
        set({ isLoading: true, error: null });

        try {
          await simulateApiDelay();

          const newBooking: TableBooking = {
            id: generateId(),
            userId: 'guest',
            userName: bookingData.name,
            userEmail: bookingData.email,
            userPhone: bookingData.phone,
            date: bookingData.date,
            time: bookingData.time,
            guests: bookingData.guests,
            specialRequests: bookingData.specialRequests,
            status: 'confirmed',
            createdAt: new Date(),
          };

          set((state) => ({
            bookings: [newBooking, ...state.bookings],
            currentBooking: newBooking,
            isLoading: false,
            error: null,
          }));

          return newBooking;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to create booking',
          });
          throw error;
        }
      },

      getBookings: async (): Promise<void> => {
        set({ isLoading: true, error: null });

        try {
          await simulateApiDelay(500);
          // In a real app, this would fetch from an API
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch bookings',
          });
        }
      },

      cancelBooking: async (bookingId: string): Promise<void> => {
        set({ isLoading: true, error: null });

        try {
          await simulateApiDelay();

          set((state) => ({
            bookings: state.bookings.map((booking) =>
              booking.id === bookingId
                ? { ...booking, status: 'cancelled' as const }
                : booking
            ),
            isLoading: false,
            error: null,
          }));
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to cancel booking',
          });
          throw error;
        }
      },

      clearCurrentBooking: (): void => {
        set({ currentBooking: null });
      },
    }),
    {
      name: 'burger-booking-storage',
    }
  )
);
