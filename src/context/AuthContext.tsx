import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginCredentials, RegisterData } from '../types';

/**
 * Authentication context interface.
 * Provides user state and authentication methods.
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

/**
 * Authentication context with default values.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Local storage key for user data.
 */
const USER_STORAGE_KEY = 'burger_palace_user';

/**
 * Local storage key for registered users.
 */
const USERS_STORAGE_KEY = 'burger_palace_users';

/**
 * Generates a unique ID for new users.
 */
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Retrieves all registered users from local storage.
 */
const getStoredUsers = (): Array<User & { password: string }> => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Saves users to local storage.
 */
const saveStoredUsers = (users: Array<User & { password: string }>): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

/**
 * AuthProvider component that wraps the application to provide authentication state.
 * Uses local storage to persist user sessions and registered users.
 * 
 * @param children - Child components that will have access to auth context
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Initialize user state from local storage on mount.
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Failed to restore user session:', error);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Authenticates a user with email and password.
   * Validates credentials against stored users.
   * 
   * @param credentials - User login credentials
   * @returns Promise resolving to success status and optional error message
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const { email, password } = credentials;

      // Validate input
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      // Check registered users
      const users = getStoredUsers();
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!existingUser) {
        return { success: false, error: 'No account found with this email' };
      }

      if (existingUser.password !== password) {
        return { success: false, error: 'Invalid password' };
      }

      // Create user object without password
      const authenticatedUser: User = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        phone: existingUser.phone,
        address: existingUser.address,
        createdAt: existingUser.createdAt,
      };

      // Save to state and local storage
      setUser(authenticatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Registers a new user account.
   * Validates data and stores new user in local storage.
   * 
   * @param data - User registration data
   * @returns Promise resolving to success status and optional error message
   */
  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const { email, password, name, phone } = data;

      // Validate required fields
      if (!email || !password || !name) {
        return { success: false, error: 'Email, password, and name are required' };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Validate password strength
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }

      // Check for existing user
      const users = getStoredUsers();
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        return { success: false, error: 'An account with this email already exists' };
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: generateUserId(),
        email: email.toLowerCase(),
        name,
        phone,
        password,
        createdAt: new Date().toISOString(),
      };

      // Save to storage
      saveStoredUsers([...users, newUser]);

      // Create user object without password for state
      const authenticatedUser: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        createdAt: newUser.createdAt,
      };

      // Auto-login after registration
      setUser(authenticatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logs out the current user and clears session.
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  /**
   * Updates the current user's profile information.
   * 
   * @param data - Partial user data to update
   * @returns Promise resolving to success status and optional error message
   */
  const updateProfile = useCallback(async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Update user in registered users
      const users = getStoredUsers();
      const userIndex = users.findIndex(u => u.id === user.id);

      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }

      // Merge updates
      const updatedUser = { ...users[userIndex], ...data };
      users[userIndex] = updatedUser;
      saveStoredUsers(users);

      // Update current user state (without password)
      const newUserState: User = {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        address: updatedUser.address,
        createdAt: updatedUser.createdAt,
      };

      setUser(newUserState);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUserState));

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context.
 * Must be used within an AuthProvider.
 * 
 * @returns Authentication context value
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
