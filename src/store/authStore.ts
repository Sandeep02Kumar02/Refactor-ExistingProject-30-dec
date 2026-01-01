/**
 * Authentication store using Zustand
 * Manages user authentication state including login, register, and logout functionality
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User, LoginCredentials, RegisterCredentials } from '../types';

// Simulated user database for demo purposes
const mockUsers: Map<string, { user: User; password: string }> = new Map();

// Generate unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Simulate API delay
const simulateApiDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials): Promise<void> => {
        set({ isLoading: true, error: null });
        
        try {
          await simulateApiDelay();
          
          const storedUser = mockUsers.get(credentials.email);
          
          if (!storedUser) {
            throw new Error('User not found. Please register first.');
          }
          
          if (storedUser.password !== credentials.password) {
            throw new Error('Invalid password. Please try again.');
          }
          
          set({
            user: storedUser.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials): Promise<void> => {
        set({ isLoading: true, error: null });
        
        try {
          await simulateApiDelay();
          
          if (mockUsers.has(credentials.email)) {
            throw new Error('An account with this email already exists.');
          }
          
          const newUser: User = {
            id: generateId(),
            email: credentials.email,
            name: credentials.name,
            phone: credentials.phone,
            createdAt: new Date(),
          };
          
          mockUsers.set(credentials.email, {
            user: newUser,
            password: credentials.password,
          });
          
          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed',
          });
          throw error;
        }
      },

      logout: (): void => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: (): void => {
        set({ error: null });
      },
    }),
    {
      name: 'burger-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Initialize with a demo user for testing
mockUsers.set('demo@burgerpalace.com', {
  user: {
    id: 'demo-user-1',
    email: 'demo@burgerpalace.com',
    name: 'Demo User',
    phone: '555-123-4567',
    createdAt: new Date('2024-01-01'),
  },
  password: 'demo123',
});
