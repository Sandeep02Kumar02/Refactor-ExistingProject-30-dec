import { MenuItem, Customization } from '../types';

// Common customizations
const burgerCustomizations: Customization[] = [
  {
    id: 'patty-doneness',
    name: 'Patty Doneness',
    required: false,
    options: [
      { id: 'medium-rare', name: 'Medium Rare', priceModifier: 0 },
      { id: 'medium', name: 'Medium', priceModifier: 0 },
      { id: 'medium-well', name: 'Medium Well', priceModifier: 0 },
      { id: 'well-done', name: 'Well Done', priceModifier: 0 },
    ],
  },
  {
    id: 'extras',
    name: 'Add Extras',
    required: false,
    maxSelections: 5,
    options: [
      { id: 'extra-patty', name: 'Extra Patty', priceModifier: 3.99 },
      { id: 'extra-cheese', name: 'Extra Cheese', priceModifier: 1.50 },
      { id: 'bacon', name: 'Bacon', priceModifier: 2.00 },
      { id: 'avocado', name: 'Avocado', priceModifier: 2.50 },
      { id: 'fried-egg', name: 'Fried Egg', priceModifier: 1.75 },
      { id: 'jalapenos', name: 'Jalapeños', priceModifier: 0.75 },
    ],
  },
  {
    id: 'remove-items',
    name: 'Remove Items',
    required: false,
    options: [
      { id: 'no-onion', name: 'No Onion', priceModifier: 0 },
      { id: 'no-tomato', name: 'No Tomato', priceModifier: 0 },
      { id: 'no-lettuce', name: 'No Lettuce', priceModifier: 0 },
      { id: 'no-pickles', name: 'No Pickles', priceModifier: 0 },
      { id: 'no-sauce', name: 'No Sauce', priceModifier: 0 },
    ],
  },
];

const sizeCustomization: Customization = {
  id: 'size',
  name: 'Size',
  required: true,
  options: [
    { id: 'small', name: 'Small', priceModifier: 0 },
    { id: 'medium', name: 'Medium', priceModifier: 1.00 },
    { id: 'large', name: 'Large', priceModifier: 2.00 },
  ],
};

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: 'classic-burger',
    name: 'Classic Bliss Burger',
    description: 'Our signature beef patty with fresh lettuce, tomato, onion, pickles, and our special Bliss sauce on a toasted brioche bun.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop',
    category: 'burgers',
    isPopular: true,
    calories: 650,
    ingredients: ['Beef Patty', 'Lettuce', 'Tomato', 'Onion', 'Pickles', 'Bliss Sauce', 'Brioche Bun'],
    customizations: burgerCustomizations,
  },
  {
    id: 'double-stack',
    name: 'Double Stack Deluxe',
    description: 'Two juicy beef patties, double cheese, crispy bacon, caramelized onions, and BBQ sauce.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=400&fit=crop',
    category: 'burgers',
    isPopular: true,
    calories: 980,
    ingredients: ['Double Beef Patty', 'Double Cheese', 'Bacon', 'Caramelized Onions', 'BBQ Sauce', 'Brioche Bun'],
    customizations: burgerCustomizations,
  },
  {
    id: 'smokey-bbq',
    name: 'Smokey BBQ Burger',
    description: 'Smoked beef patty, crispy onion rings, cheddar cheese, smoky BBQ sauce, and coleslaw.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&h=400&fit=crop',
    category: 'burgers',
    calories: 820,
    ingredients: ['Smoked Beef Patty', 'Onion Rings', 'Cheddar', 'BBQ Sauce', 'Coleslaw', 'Sesame Bun'],
    customizations: burgerCustomizations,
  },
  {
    id: 'spicy-inferno',
    name: 'Spicy Inferno',
    description: 'For the heat lovers! Jalapeño-infused patty, pepper jack cheese, sriracha mayo, and fresh jalapeños.',
    price: 14.49,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=400&fit=crop',
    category: 'burgers',
    isNew: true,
    calories: 710,
    ingredients: ['Jalapeño Beef Patty', 'Pepper Jack', 'Sriracha Mayo', 'Fresh Jalapeños', 'Brioche Bun'],
    customizations: burgerCustomizations,
  },
  {
    id: 'mushroom-swiss',
    name: 'Mushroom Swiss',
    description: 'Beef patty topped with sautéed mushrooms, melted Swiss cheese, and garlic aioli.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=400&fit=crop',
    category: 'burgers',
    calories: 740,
    ingredients: ['Beef Patty', 'Sautéed Mushrooms', 'Swiss Cheese', 'Garlic Aioli', 'Brioche Bun'],
    customizations: burgerCustomizations,
  },
  {
    id: 'veggie-garden',
    name: 'Veggie Garden Burger',
    description: 'Plant-based patty with avocado, roasted peppers, sprouts, and herb mayo.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&h=400&fit=crop',
    category: 'burgers',
    calories: 480,
    ingredients: ['Plant-Based Patty', 'Avocado', 'Roasted Peppers', 'Sprouts', 'Herb Mayo', 'Whole Grain Bun'],
    customizations: [
      {
        id: 'extras-veggie',
        name: 'Add Extras',
        required: false,
        options: [
          { id: 'extra-avocado', name: 'Extra Avocado', priceModifier: 2.50 },
          { id: 'vegan-cheese', name: 'Vegan Cheese', priceModifier: 1.50 },
          { id: 'hummus', name: 'Hummus', priceModifier: 1.00 },
        ],
      },
    ],
  },

  // Sides
  {
    id: 'classic-fries',
    name: 'Classic Fries',
    description: 'Crispy golden fries seasoned with our special blend of spices.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop',
    category: 'sides',
    isPopular: true,
    calories: 380,
    customizations: [sizeCustomization],
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Cheese Fries',
    description: 'Fries smothered in cheese sauce, bacon bits, and green onions.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=500&h=400&fit=crop',
    category: 'sides',
    calories: 620,
    customizations: [sizeCustomization],
  },
  {
    id: 'onion-rings',
    name: 'Crispy Onion Rings',
    description: 'Beer-battered onion rings with zesty ranch dipping sauce.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&h=400&fit=crop',
    category: 'sides',
    calories: 450,
    customizations: [sizeCustomization],
  },
  {
    id: 'sweet-potato-fries',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with chipotle aioli.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?w=500&h=400&fit=crop',
    category: 'sides',
    isNew: true,
    calories: 340,
    customizations: [sizeCustomization],
  },
  {
    id: 'coleslaw',
    name: 'Creamy Coleslaw',
    description: 'Fresh cabbage and carrots in our tangy, creamy dressing.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1625938145312-ab8ced7e0d0a?w=500&h=400&fit=crop',
    category: 'sides',
    calories: 180,
  },

  // Drinks
  {
    id: 'craft-soda',
    name: 'Craft Soda',
    description: 'Choose from our selection of artisan craft sodas.',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500&h=400&fit=crop',
    category: 'drinks',
    calories: 150,
    customizations: [
      {
        id: 'soda-flavor',
        name: 'Flavor',
        required: true,
        options: [
          { id: 'cola', name: 'Classic Cola', priceModifier: 0 },
          { id: 'root-beer', name: 'Root Beer', priceModifier: 0 },
          { id: 'orange', name: 'Orange Cream', priceModifier: 0 },
          { id: 'lemon-lime', name: 'Lemon Lime', priceModifier: 0 },
          { id: 'ginger', name: 'Ginger Ale', priceModifier: 0 },
        ],
      },
      sizeCustomization,
    ],
  },
  {
    id: 'milkshake',
    name: 'Hand-Spun Milkshake',
    description: 'Thick and creamy milkshakes made with premium ice cream.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop',
    category: 'drinks',
    isPopular: true,
    calories: 580,
    customizations: [
      {
        id: 'shake-flavor',
        name: 'Flavor',
        required: true,
        options: [
          { id: 'vanilla', name: 'Vanilla', priceModifier: 0 },
          { id: 'chocolate', name: 'Chocolate', priceModifier: 0 },
          { id: 'strawberry', name: 'Strawberry', priceModifier: 0 },
          { id: 'peanut-butter', name: 'Peanut Butter', priceModifier: 0.50 },
          { id: 'oreo', name: 'Cookies & Cream', priceModifier: 0.50 },
        ],
      },
      {
        id: 'toppings',
        name: 'Add Toppings',
        required: false,
        maxSelections: 3,
        options: [
          { id: 'whipped-cream', name: 'Whipped Cream', priceModifier: 0.50 },
          { id: 'cherry', name: 'Cherry on Top', priceModifier: 0.25 },
          { id: 'sprinkles', name: 'Sprinkles', priceModifier: 0.25 },
        ],
      },
    ],
  },
  {
    id: 'fresh-lemonade',
    name: 'Fresh Squeezed Lemonade',
    description: 'Made fresh daily with real lemons and a hint of mint.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&h=400&fit=crop',
    category: 'drinks',
    calories: 120,
    customizations: [
      {
        id: 'lemonade-type',
        name: 'Type',
        required: true,
        options: [
          { id: 'classic', name: 'Classic', priceModifier: 0 },
          { id: 'strawberry', name: 'Strawberry', priceModifier: 0.50 },
          { id: 'raspberry', name: 'Raspberry', priceModifier: 0.50 },
        ],
      },
      sizeCustomization,
    ],
  },
  {
    id: 'iced-tea',
    name: 'Iced Tea',
    description: 'Refreshing iced tea, sweetened or unsweetened.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=400&fit=crop',
    category: 'drinks',
    calories: 80,
    customizations: [
      {
        id: 'sweetness',
        name: 'Sweetness',
        required: true,
        options: [
          { id: 'unsweetened', name: 'Unsweetened', priceModifier: 0 },
          { id: 'half-sweet', name: 'Half Sweet', priceModifier: 0 },
          { id: 'sweet', name: 'Sweet', priceModifier: 0 },
        ],
      },
      sizeCustomization,
    ],
  },

  // Desserts
  {
    id: 'brownie-sundae',
    name: 'Brownie Sundae',
    description: 'Warm chocolate brownie topped with vanilla ice cream, hot fudge, and whipped cream.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&h=400&fit=crop',
    category: 'desserts',
    isPopular: true,
    calories: 680,
  },
  {
    id: 'churros',
    name: 'Cinnamon Churros',
    description: 'Crispy churros dusted with cinnamon sugar, served with chocolate dipping sauce.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1624371414361-e670edf49c3c?w=500&h=400&fit=crop',
    category: 'desserts',
    isNew: true,
    calories: 420,
  },
  {
    id: 'apple-pie',
    name: 'Apple Pie à la Mode',
    description: 'Classic apple pie with vanilla ice cream and caramel drizzle.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=500&h=400&fit=crop',
    category: 'desserts',
    calories: 520,
  },

  // Combos
  {
    id: 'classic-combo',
    name: 'Classic Bliss Combo',
    description: 'Classic Bliss Burger + Classic Fries (Medium) + Craft Soda (Medium)',
    price: 17.99,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=400&fit=crop',
    category: 'combos',
    isPopular: true,
    calories: 1180,
  },
  {
    id: 'double-combo',
    name: 'Double Stack Combo',
    description: 'Double Stack Deluxe + Loaded Cheese Fries (Medium) + Milkshake',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=500&h=400&fit=crop',
    category: 'combos',
    calories: 2180,
  },
  {
    id: 'family-feast',
    name: 'Family Feast',
    description: '4 Classic Burgers + 2 Large Fries + 4 Drinks + 2 Desserts',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&h=400&fit=crop',
    category: 'combos',
    isNew: true,
    calories: 4500,
  },
];

export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  return menuItems.filter(item => item.category === category);
};

export const getPopularItems = (): MenuItem[] => {
  return menuItems.filter(item => item.isPopular);
};

export const getNewItems = (): MenuItem[] => {
  return menuItems.filter(item => item.isNew);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

export const categories = [
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍨' },
  { id: 'combos', name: 'Combos', icon: '🎁' },
];

export default menuItems;
