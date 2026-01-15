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

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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
  isPopular?: boolean;
  isNew?: boolean;
  calories?: number;
  ingredients?: string[];
  customizations?: Customization[];
}

export type MenuCategory = 
  | 'burgers'
  | 'sides'
  | 'drinks'
  | 'desserts'
  | 'combos';

export interface Customization {
  id: string;
  name: string;
  options: CustomizationOption[];
  required: boolean;
  maxSelections?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  priceModifier: number;
}

// Cart types
export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations?: SelectedCustomization[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface SelectedCustomization {
  customizationId: string;
  optionIds: string[];
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  orderType: OrderType;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  deliveryAddress?: string;
  specialInstructions?: string;
  createdAt: Date;
  estimatedDeliveryTime?: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

export type OrderType = 'delivery' | 'pickup' | 'dine-in';

// Table booking types
export interface TableBooking {
  id: string;
  userId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: Date;
  time: string;
  partySize: number;
  specialRequests?: string;
  status: BookingStatus;
  tableNumber?: number;
  createdAt: Date;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no-show';

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string;
}

// UI types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
