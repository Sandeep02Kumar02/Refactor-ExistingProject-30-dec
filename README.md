# 🍔 Burger Bliss

A modern burger restaurant website built with Vite, React, and TypeScript. Features user authentication, online ordering, and table reservations.

## Features

- **User Authentication**: Login and registration with session persistence
- **Menu Browsing**: Browse our delicious menu with filtering and search
- **Online Ordering**: Add items to cart with customizations and checkout
- **Table Booking**: Reserve tables for dine-in experiences
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Stack**: Built with Vite, React 18, TypeScript, and Tailwind CSS

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6
- **Icons**: Lucide React
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd burger-restaurant
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: demo@burgerbliss.com
- **Password**: demo123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header.tsx    # Navigation header
│   ├── Footer.tsx    # Site footer
│   └── MenuItemCard.tsx  # Menu item display card
├── context/          # React Context providers
│   ├── AuthContext.tsx   # Authentication state
│   └── CartContext.tsx   # Shopping cart state
├── data/             # Mock data
│   └── menuData.ts   # Menu items and categories
├── pages/            # Page components
│   ├── HomePage.tsx      # Landing page
│   ├── MenuPage.tsx      # Full menu listing
│   ├── OrderPage.tsx     # Online ordering
│   ├── BookingPage.tsx   # Table reservations
│   ├── LoginPage.tsx     # User login
│   ├── RegisterPage.tsx  # User registration
│   ├── CartPage.tsx      # Shopping cart
│   └── ProfilePage.tsx   # User profile
├── types/            # TypeScript type definitions
│   └── index.ts      # All type exports
├── App.tsx           # Main app component with routing
├── main.tsx          # Application entry point
└── index.css         # Global styles and Tailwind
```

## Features Overview

### 🔐 Authentication
- User registration with password strength validation
- Secure login with session persistence
- Profile management

### 🍔 Menu
- Browse items by category (Burgers, Sides, Drinks, Desserts, Combos)
- Search functionality
- Filter by popular or new items
- Detailed item view with ingredients and calories

### 🛒 Online Ordering
- Add items to cart
- Adjust quantities
- Apply promo codes
- Checkout process

### 📅 Table Booking
- Select date and time
- Choose party size
- Add special requests
- Confirmation with booking details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

Made with ❤️ and 🍔 by Burger Bliss Team
