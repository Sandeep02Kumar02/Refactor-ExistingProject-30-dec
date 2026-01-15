import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { CartItem, MenuItem, Cart } from '../types';

/**
 * Tax rate for order calculations (8.5%).
 */
const TAX_RATE = 0.085;

/**
 * Local storage key for cart data.
 */
const CART_STORAGE_KEY = 'burger_palace_cart';

/**
 * Cart context interface.
 * Provides cart state and cart manipulation methods.
 */
interface CartContextType {
  cart: Cart;
  itemCount: number;
  addItem: (item: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateSpecialInstructions: (itemId: string, instructions: string) => void;
  clearCart: () => void;
  isItemInCart: (itemId: string) => boolean;
  getItemQuantity: (itemId: string) => number;
}

/**
 * Cart context with default values.
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Calculates cart totals from items.
 * 
 * @param items - Array of cart items
 * @returns Object containing subtotal, tax, and total
 */
const calculateTotals = (items: CartItem[]): { subtotal: number; tax: number; total: number } => {
  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

/**
 * Creates an empty cart state.
 */
const createEmptyCart = (): Cart => ({
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
});

/**
 * CartProvider component that wraps the application to provide cart state.
 * Uses local storage to persist cart between sessions.
 * 
 * @param children - Child components that will have access to cart context
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(createEmptyCart);

  /**
   * Initialize cart state from local storage on mount.
   */
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        // Recalculate totals to ensure accuracy
        const totals = calculateTotals(parsedCart.items || []);
        setCart({
          items: parsedCart.items || [],
          ...totals,
        });
      }
    } catch (error) {
      console.error('Failed to restore cart:', error);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  /**
   * Persist cart to local storage whenever it changes.
   */
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cart]);

  /**
   * Adds an item to the cart or increments quantity if already present.
   * 
   * @param item - Menu item to add
   * @param quantity - Quantity to add (default: 1)
   * @param specialInstructions - Optional special instructions for the item
   */
  const addItem = useCallback((
    item: MenuItem,
    quantity: number = 1,
    specialInstructions?: string
  ) => {
    setCart(prevCart => {
      const existingIndex = prevCart.items.findIndex(
        cartItem => cartItem.menuItem.id === item.id
      );

      let newItems: CartItem[];

      if (existingIndex >= 0) {
        // Item exists, update quantity
        newItems = prevCart.items.map((cartItem, index) =>
          index === existingIndex
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
                specialInstructions: specialInstructions || cartItem.specialInstructions,
              }
            : cartItem
        );
      } else {
        // New item, add to cart
        const newCartItem: CartItem = {
          menuItem: item,
          quantity,
          specialInstructions,
        };
        newItems = [...prevCart.items, newCartItem];
      }

      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    });
  }, []);

  /**
   * Removes an item completely from the cart.
   * 
   * @param itemId - ID of the menu item to remove
   */
  const removeItem = useCallback((itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.menuItem.id !== itemId);
      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    });
  }, []);

  /**
   * Updates the quantity of an item in the cart.
   * Removes the item if quantity is 0 or less.
   * 
   * @param itemId - ID of the menu item to update
   * @param quantity - New quantity
   */
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.menuItem.id === itemId
          ? { ...item, quantity }
          : item
      );

      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    });
  }, [removeItem]);

  /**
   * Updates the special instructions for an item in the cart.
   * 
   * @param itemId - ID of the menu item to update
   * @param instructions - New special instructions
   */
  const updateSpecialInstructions = useCallback((itemId: string, instructions: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.menuItem.id === itemId
          ? { ...item, specialInstructions: instructions }
          : item
      );

      return {
        ...prevCart,
        items: newItems,
      };
    });
  }, []);

  /**
   * Clears all items from the cart.
   */
  const clearCart = useCallback(() => {
    setCart(createEmptyCart());
  }, []);

  /**
   * Checks if an item is in the cart.
   * 
   * @param itemId - ID of the menu item to check
   * @returns True if item is in cart
   */
  const isItemInCart = useCallback((itemId: string): boolean => {
    return cart.items.some(item => item.menuItem.id === itemId);
  }, [cart.items]);

  /**
   * Gets the quantity of an item in the cart.
   * 
   * @param itemId - ID of the menu item
   * @returns Quantity of the item (0 if not in cart)
   */
  const getItemQuantity = useCallback((itemId: string): number => {
    const item = cart.items.find(item => item.menuItem.id === itemId);
    return item?.quantity || 0;
  }, [cart.items]);

  /**
   * Total number of items in cart (sum of quantities).
   */
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    cart,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    updateSpecialInstructions,
    clearCart,
    isItemInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to access cart context.
 * Must be used within a CartProvider.
 * 
 * @returns Cart context value
 * @throws Error if used outside of CartProvider
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export default CartContext;
