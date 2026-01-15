import type { MenuItem } from '../types';

/**
 * Complete menu data for Burger Palace.
 * Contains all available burgers, sides, drinks, and desserts.
 */

/**
 * Burger menu items.
 * Each burger includes name, description, price, and nutritional info.
 */
export const burgers: MenuItem[] = [
  {
    id: 'burger-classic',
    name: 'Classic Burger',
    description: 'Our signature beef patty with fresh lettuce, tomato, onion, pickles, and our special sauce on a toasted sesame bun.',
    price: 8.99,
    image: '/images/classic-burger.jpg',
    category: 'burgers',
    isPopular: true,
    calories: 650,
    ingredients: ['Beef patty', 'Lettuce', 'Tomato', 'Onion', 'Pickles', 'Special sauce', 'Sesame bun'],
    customizable: true,
  },
  {
    id: 'burger-cheese',
    name: 'Cheeseburger Deluxe',
    description: 'Double beef patties with melted American cheese, caramelized onions, and tangy mustard.',
    price: 10.99,
    image: '/images/cheese-burger.jpg',
    category: 'burgers',
    isPopular: true,
    calories: 850,
    ingredients: ['Double beef patty', 'American cheese', 'Caramelized onions', 'Mustard', 'Brioche bun'],
    customizable: true,
  },
  {
    id: 'burger-bacon',
    name: 'Bacon BBQ Burger',
    description: 'Juicy beef patty topped with crispy bacon, cheddar cheese, onion rings, and smoky BBQ sauce.',
    price: 12.49,
    image: '/images/bacon-burger.jpg',
    category: 'burgers',
    isNew: true,
    calories: 920,
    ingredients: ['Beef patty', 'Bacon', 'Cheddar cheese', 'Onion rings', 'BBQ sauce', 'Brioche bun'],
    customizable: true,
  },
  {
    id: 'burger-mushroom',
    name: 'Mushroom Swiss Burger',
    description: 'Premium beef patty with sautéed mushrooms, melted Swiss cheese, and garlic aioli.',
    price: 11.99,
    image: '/images/mushroom-burger.jpg',
    category: 'burgers',
    calories: 780,
    ingredients: ['Beef patty', 'Sautéed mushrooms', 'Swiss cheese', 'Garlic aioli', 'Ciabatta bun'],
    customizable: true,
  },
  {
    id: 'burger-spicy',
    name: 'Spicy Jalapeño Burger',
    description: 'Fire-grilled patty with pepper jack cheese, fresh jalapeños, chipotle mayo, and crispy fried onions.',
    price: 11.49,
    image: '/images/spicy-burger.jpg',
    category: 'burgers',
    isPopular: true,
    calories: 810,
    ingredients: ['Beef patty', 'Pepper jack cheese', 'Jalapeños', 'Chipotle mayo', 'Fried onions', 'Sesame bun'],
    customizable: true,
  },
  {
    id: 'burger-veggie',
    name: 'Garden Veggie Burger',
    description: 'House-made vegetable patty with avocado, sprouts, tomato, and herb mayo on a whole wheat bun.',
    price: 9.99,
    image: '/images/veggie-burger.jpg',
    category: 'burgers',
    calories: 520,
    ingredients: ['Veggie patty', 'Avocado', 'Sprouts', 'Tomato', 'Herb mayo', 'Whole wheat bun'],
    customizable: true,
  },
  {
    id: 'burger-chicken',
    name: 'Crispy Chicken Burger',
    description: 'Crispy breaded chicken breast with coleslaw, pickles, and honey mustard sauce.',
    price: 10.49,
    image: '/images/chicken-burger.jpg',
    category: 'burgers',
    calories: 720,
    ingredients: ['Crispy chicken', 'Coleslaw', 'Pickles', 'Honey mustard', 'Brioche bun'],
    customizable: true,
  },
  {
    id: 'burger-ultimate',
    name: 'Ultimate Triple Stack',
    description: 'Three beef patties, triple cheese, bacon, fried egg, and all the fixings. For the truly hungry!',
    price: 16.99,
    image: '/images/ultimate-burger.jpg',
    category: 'burgers',
    isNew: true,
    calories: 1450,
    ingredients: ['Triple beef patty', 'American cheese', 'Cheddar cheese', 'Swiss cheese', 'Bacon', 'Fried egg', 'Lettuce', 'Tomato', 'Onion', 'Special sauce'],
    customizable: true,
  },
];

/**
 * Side dishes menu items.
 */
export const sides: MenuItem[] = [
  {
    id: 'side-fries',
    name: 'Classic Fries',
    description: 'Golden crispy fries seasoned with our signature blend of spices.',
    price: 3.99,
    image: '/images/fries.jpg',
    category: 'sides',
    isPopular: true,
    calories: 380,
  },
  {
    id: 'side-curly-fries',
    name: 'Curly Fries',
    description: 'Spiral-cut seasoned fries with a hint of paprika and garlic.',
    price: 4.49,
    image: '/images/curly-fries.jpg',
    category: 'sides',
    calories: 420,
  },
  {
    id: 'side-onion-rings',
    name: 'Onion Rings',
    description: 'Thick-cut onion rings with crispy golden batter. Served with dipping sauce.',
    price: 4.99,
    image: '/images/onion-rings.jpg',
    category: 'sides',
    isPopular: true,
    calories: 450,
  },
  {
    id: 'side-loaded-fries',
    name: 'Loaded Cheese Fries',
    description: 'Crispy fries topped with melted cheese, bacon bits, and sour cream.',
    price: 6.99,
    image: '/images/loaded-fries.jpg',
    category: 'sides',
    calories: 680,
  },
  {
    id: 'side-sweet-potato',
    name: 'Sweet Potato Fries',
    description: 'Hand-cut sweet potato fries with a touch of cinnamon. Served with maple aioli.',
    price: 4.99,
    image: '/images/sweet-potato-fries.jpg',
    category: 'sides',
    calories: 360,
  },
  {
    id: 'side-coleslaw',
    name: 'Creamy Coleslaw',
    description: 'Fresh cabbage and carrots in our house-made creamy dressing.',
    price: 2.99,
    image: '/images/coleslaw.jpg',
    category: 'sides',
    calories: 180,
  },
  {
    id: 'side-salad',
    name: 'Garden Salad',
    description: 'Fresh mixed greens, cherry tomatoes, cucumber, and your choice of dressing.',
    price: 5.99,
    image: '/images/garden-salad.jpg',
    category: 'sides',
    calories: 120,
  },
  {
    id: 'side-mac-cheese',
    name: 'Mac & Cheese Bites',
    description: 'Creamy mac and cheese, breaded and fried to golden perfection.',
    price: 5.49,
    image: '/images/mac-cheese-bites.jpg',
    category: 'sides',
    isNew: true,
    calories: 520,
  },
];

/**
 * Beverage menu items.
 */
export const drinks: MenuItem[] = [
  {
    id: 'drink-soda',
    name: 'Fountain Soda',
    description: 'Your choice of Coca-Cola, Sprite, Fanta, or Dr Pepper. Free refills!',
    price: 2.49,
    image: '/images/soda.jpg',
    category: 'drinks',
    calories: 150,
  },
  {
    id: 'drink-milkshake-vanilla',
    name: 'Vanilla Milkshake',
    description: 'Rich and creamy vanilla shake made with real ice cream.',
    price: 5.99,
    image: '/images/vanilla-shake.jpg',
    category: 'drinks',
    isPopular: true,
    calories: 580,
  },
  {
    id: 'drink-milkshake-chocolate',
    name: 'Chocolate Milkshake',
    description: 'Indulgent chocolate shake blended with premium cocoa and ice cream.',
    price: 5.99,
    image: '/images/chocolate-shake.jpg',
    category: 'drinks',
    isPopular: true,
    calories: 620,
  },
  {
    id: 'drink-milkshake-strawberry',
    name: 'Strawberry Milkshake',
    description: 'Sweet strawberry shake made with real strawberries and ice cream.',
    price: 5.99,
    image: '/images/strawberry-shake.jpg',
    category: 'drinks',
    calories: 560,
  },
  {
    id: 'drink-lemonade',
    name: 'Fresh Lemonade',
    description: 'House-made lemonade with a perfect balance of sweet and tart.',
    price: 3.49,
    image: '/images/lemonade.jpg',
    category: 'drinks',
    calories: 180,
  },
  {
    id: 'drink-iced-tea',
    name: 'Iced Tea',
    description: 'Freshly brewed unsweetened iced tea. Sweetener available upon request.',
    price: 2.49,
    image: '/images/iced-tea.jpg',
    category: 'drinks',
    calories: 5,
  },
  {
    id: 'drink-water',
    name: 'Bottled Water',
    description: 'Refreshing purified bottled water.',
    price: 1.99,
    image: '/images/water.jpg',
    category: 'drinks',
    calories: 0,
  },
  {
    id: 'drink-coffee',
    name: 'Fresh Brewed Coffee',
    description: 'Hot coffee brewed fresh throughout the day.',
    price: 2.29,
    image: '/images/coffee.jpg',
    category: 'drinks',
    calories: 5,
  },
];

/**
 * Dessert menu items.
 */
export const desserts: MenuItem[] = [
  {
    id: 'dessert-brownie',
    name: 'Chocolate Brownie',
    description: 'Warm fudgy brownie topped with vanilla ice cream and chocolate sauce.',
    price: 5.99,
    image: '/images/brownie.jpg',
    category: 'desserts',
    isPopular: true,
    calories: 680,
  },
  {
    id: 'dessert-apple-pie',
    name: 'Apple Pie',
    description: 'Classic apple pie with cinnamon and served warm with whipped cream.',
    price: 4.99,
    image: '/images/apple-pie.jpg',
    category: 'desserts',
    calories: 420,
  },
  {
    id: 'dessert-sundae',
    name: 'Ice Cream Sundae',
    description: 'Three scoops of ice cream with hot fudge, whipped cream, and a cherry.',
    price: 6.49,
    image: '/images/sundae.jpg',
    category: 'desserts',
    calories: 720,
  },
  {
    id: 'dessert-churros',
    name: 'Cinnamon Churros',
    description: 'Crispy churros dusted with cinnamon sugar. Served with chocolate sauce.',
    price: 4.49,
    image: '/images/churros.jpg',
    category: 'desserts',
    isNew: true,
    calories: 380,
  },
  {
    id: 'dessert-cookie',
    name: 'Fresh Baked Cookie',
    description: 'Warm chocolate chip cookie baked fresh to order.',
    price: 2.49,
    image: '/images/cookie.jpg',
    category: 'desserts',
    calories: 280,
  },
];

/**
 * Combo meal options.
 */
export const combos: MenuItem[] = [
  {
    id: 'combo-classic',
    name: 'Classic Combo',
    description: 'Classic Burger + Regular Fries + Fountain Soda. Great value!',
    price: 12.99,
    image: '/images/combo-classic.jpg',
    category: 'combos',
    isPopular: true,
    calories: 1180,
  },
  {
    id: 'combo-cheese',
    name: 'Cheese Lover Combo',
    description: 'Cheeseburger Deluxe + Loaded Cheese Fries + Milkshake of your choice.',
    price: 18.99,
    image: '/images/combo-cheese.jpg',
    category: 'combos',
    calories: 2050,
  },
  {
    id: 'combo-family',
    name: 'Family Feast',
    description: '4 Classic Burgers + 2 Large Fries + 4 Fountain Sodas. Perfect for sharing!',
    price: 39.99,
    image: '/images/combo-family.jpg',
    category: 'combos',
    calories: 4720,
  },
  {
    id: 'combo-kids',
    name: 'Kids Meal',
    description: 'Mini burger + Small fries + Juice box + Cookie. Includes a fun toy!',
    price: 7.99,
    image: '/images/combo-kids.jpg',
    category: 'combos',
    calories: 680,
  },
];

/**
 * All menu items combined.
 */
export const allMenuItems: MenuItem[] = [
  ...burgers,
  ...sides,
  ...drinks,
  ...desserts,
  ...combos,
];

/**
 * Get menu items by category.
 * 
 * @param category - The category to filter by
 * @returns Array of menu items in the specified category
 */
export const getMenuByCategory = (category: string): MenuItem[] => {
  return allMenuItems.filter(item => item.category === category);
};

/**
 * Get popular menu items.
 * 
 * @returns Array of popular menu items
 */
export const getPopularItems = (): MenuItem[] => {
  return allMenuItems.filter(item => item.isPopular);
};

/**
 * Get new menu items.
 * 
 * @returns Array of new menu items
 */
export const getNewItems = (): MenuItem[] => {
  return allMenuItems.filter(item => item.isNew);
};

/**
 * Get a menu item by ID.
 * 
 * @param id - The menu item ID
 * @returns The menu item or undefined if not found
 */
export const getMenuItemById = (id: string): MenuItem | undefined => {
  return allMenuItems.find(item => item.id === id);
};

/**
 * Search menu items by name or description.
 * 
 * @param query - Search query string
 * @returns Array of matching menu items
 */
export const searchMenuItems = (query: string): MenuItem[] => {
  const lowerQuery = query.toLowerCase();
  return allMenuItems.filter(
    item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  );
};

export default allMenuItems;
