# Burger Palace 🍔

A modern burger restaurant website built with Vite, React, and TypeScript. Features include online ordering, user authentication, and table booking for dine-in.

## Features

- **Browse Menu**: View our delicious selection of burgers, sides, drinks, and desserts
- **Order Online**: Add items to cart and checkout for pickup, delivery, or dine-in
- **Book a Table**: Reserve a table for your dining experience
- **User Authentication**: Create an account to save your orders and bookings
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand 5
- **Routing**: React Router 7
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

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

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication forms
│   ├── booking/        # Table booking components
│   ├── cart/           # Shopping cart components
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── menu/           # Menu item components
├── data/               # Static data (menu items)
├── pages/              # Page components
├── store/              # Zustand state stores
├── types/              # TypeScript type definitions
├── App.tsx             # Main app with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Demo Credentials

For testing the login functionality:
- **Email**: demo@burgerpalace.com
- **Password**: demo123

## License

MIT License - feel free to use this project for learning or as a starting point for your own restaurant website!
