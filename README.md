# 🍔 Burger Palace

A modern burger restaurant website built with **Vite.js**, **React**, and **TypeScript**. Features user authentication, online ordering, and table booking for dine-in.

## ✨ Features

- **User Authentication**: Register and login to manage your account
- **Online Ordering**: Browse the menu, add items to cart, and place orders
- **Table Booking**: Reserve tables for dine-in dining experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Order History**: View past orders and track current order status
- **Profile Management**: Update personal information and delivery address

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd burger-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://127.0.0.1:3000](http://127.0.0.1:3000)

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## 📁 Project Structure

```
burger-website/
├── public/                  # Static assets
│   └── burger-icon.svg      # Favicon
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── MenuItemCard.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/             # React Context providers
│   │   ├── AuthContext.tsx  # Authentication state
│   │   └── CartContext.tsx  # Shopping cart state
│   ├── data/                # Static data
│   │   └── menu.ts          # Menu items
│   ├── pages/               # Page components
│   │   ├── BookingPage.tsx  # Table reservation
│   │   ├── CartPage.tsx     # Shopping cart
│   │   ├── CheckoutPage.tsx # Order checkout
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── LoginPage.tsx    # User login
│   │   ├── MenuPage.tsx     # Menu listing
│   │   ├── NotFoundPage.tsx # 404 page
│   │   ├── OrdersPage.tsx   # Order history
│   │   ├── ProfilePage.tsx  # User profile
│   │   └── RegisterPage.tsx # User registration
│   ├── styles/              # Global styles
│   │   └── index.css        # Tailwind + custom CSS
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # Vite type declarations
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🍔 Menu Categories

- **Burgers**: Classic, Cheeseburger Deluxe, Bacon BBQ, Mushroom Swiss, and more
- **Sides**: Fries, Onion Rings, Loaded Cheese Fries, Garden Salad
- **Drinks**: Fountain Soda, Milkshakes, Fresh Lemonade, Iced Tea
- **Desserts**: Chocolate Brownie, Apple Pie, Ice Cream Sundae, Churros
- **Combos**: Family Feast, Classic Combo, Kids Meal

## 🔐 Authentication

The app uses local storage for user authentication (demo purposes). Features include:
- User registration with email/password
- Login with stored credentials
- Session persistence across browser refreshes
- Protected routes for checkout and order history

## 📅 Table Booking

Reserve a table for dine-in:
- Select date (up to 30 days in advance)
- Choose from available time slots
- Specify party size (1-8 guests)
- Add special requests

## 🛒 Online Ordering

Order food for pickup or delivery:
- Browse categorized menu
- Search for specific items
- Add items to cart with quantities
- Specify special instructions
- Choose pickup or delivery
- Track order status

## 📱 Responsive Design

The website is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Design System

- **Primary Color**: Orange (#f97316)
- **Font Families**: Inter (body), Poppins (headings)
- **Components**: Buttons, inputs, cards, badges
- **Tailwind CSS**: Utility-first styling

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ and 🍔
