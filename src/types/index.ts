/**
 * Type definitions for Burger Palace application.
 * Contains interfaces for users, menu items, orders, and table bookings.
 */

/**
 * User account information for authentication.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

/**
 * Credentials for user login.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Data required for user registration.
 */
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

/**
 * Menu item representing a burger or side item.
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  isPopular?: boolean;
  isNew?: boolean;
  calories?: number;
  ingredients?: string[];
  customizable?: boolean;
}

/**
 * Categories for menu items.
 */
export type MenuCategory = 'burgers' | 'sides' | 'drinks' | 'desserts' | 'combos';

/**
 * Item in the shopping cart with quantity.
 */
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  customizations?: string[];
}

/**
 * Shopping cart state.
 */
export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

/**
 * Order placed by user.
 */
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
  createdAt: string;
  estimatedReadyTime?: string;
}

/**
 * Status of an order.
 */
export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'out-for-delivery' 
  | 'delivered' 
  | 'completed' 
  | 'cancelled';

/**
 * Type of order (pickup or delivery).
 */
export type OrderType = 'pickup' | 'delivery';

/**
 * Table booking for dine-in.
 */
export interface TableBooking {
  id: string;
  userId: string;
  date: string;
  time: string;
  partySize: number;
  tableNumber?: number;
  status: BookingStatus;
  specialRequests?: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

/**
 * Status of a table booking.
 */
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

/**
 * Data required to create a table booking.
 */
export interface BookingFormData {
  date: string;
  time: string;
  partySize: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

/**
 * Available time slots for table booking.
 */
export interface TimeSlot {
  time: string;
  available: boolean;
}

/**
 * Restaurant location information.
 */
export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: BusinessHours;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * Business hours for a location.
 */
export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

/**
 * Operating hours for a single day.
 */
export interface DayHours {
  open: string;
  close: string;
  closed?: boolean;
}

/**
 * Props for form field components.
 */
export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: Array<{ value: string; label: string }>;
}

/**
 * Generic API response wrapper.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination parameters.
 */
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Notification message.
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
