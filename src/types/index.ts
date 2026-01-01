/**
 * Type definitions for the Burger Restaurant application
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

// Menu types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  ingredients: string[];
  isAvailable: boolean;
  isPopular?: boolean;
  calories?: number;
}

export type MenuCategory = 'burgers' | 'sides' | 'drinks' | 'desserts' | 'combos';

// Cart types
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  orderType: OrderType;
  deliveryAddress?: string;
  specialInstructions?: string;
  createdAt: Date;
  estimatedTime?: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type OrderType = 'pickup' | 'delivery' | 'dine-in';

// Booking types
export interface TableBooking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: Date;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

// Store types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number, instructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  getOrders: () => Promise<void>;
  clearCurrentOrder: () => void;
}

export interface BookingState {
  bookings: TableBooking[];
  currentBooking: TableBooking | null;
  isLoading: boolean;
  error: string | null;
  createBooking: (bookingData: BookingFormData) => Promise<TableBooking>;
  getBookings: () => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  clearCurrentBooking: () => void;
}
