import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem, Cart, SelectedCustomization } from '../types';

interface CartContextType {
  cart: Cart;
  itemCount: number;
  addToCart: (item: MenuItem, quantity?: number, customizations?: SelectedCustomization[], specialInstructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemTotal: (item: MenuItem, quantity: number, customizations?: SelectedCustomization[]) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'burger_bliss_cart';
const TAX_RATE = 0.0825; // 8.25% tax
const DELIVERY_FEE = 3.99;

function calculateCartTotals(items: CartItem[]): Omit<Cart, 'items'> {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * TAX_RATE;
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + tax + deliveryFee;
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsedItems = JSON.parse(storedCart);
        setCartItems(parsedItems);
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemTotal = useCallback((
    item: MenuItem,
    quantity: number,
    customizations?: SelectedCustomization[]
  ): number => {
    let itemPrice = item.price;
    
    // Add customization price modifiers
    if (customizations && item.customizations) {
      customizations.forEach(selection => {
        const customization = item.customizations?.find(c => c.id === selection.customizationId);
        if (customization) {
          selection.optionIds.forEach(optionId => {
            const option = customization.options.find(o => o.id === optionId);
            if (option) {
              itemPrice += option.priceModifier;
            }
          });
        }
      });
    }
    
    return Math.round(itemPrice * quantity * 100) / 100;
  }, []);

  const addToCart = useCallback((
    item: MenuItem,
    quantity: number = 1,
    customizations?: SelectedCustomization[],
    specialInstructions?: string
  ) => {
    const totalPrice = getItemTotal(item, quantity, customizations);
    
    const newCartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      customizations,
      specialInstructions,
      totalPrice,
    };
    
    setCartItems(prev => [...prev, newCartItem]);
  }, [getItemTotal]);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    
    setCartItems(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const unitPrice = item.totalPrice / item.quantity;
        return {
          ...item,
          quantity,
          totalPrice: Math.round(unitPrice * quantity * 100) / 100,
        };
      }
      return item;
    }));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cart: Cart = {
    items: cartItems,
    ...calculateCartTotals(cartItems),
  };

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    cart,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
