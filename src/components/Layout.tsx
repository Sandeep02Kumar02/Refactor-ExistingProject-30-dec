import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout component that wraps all pages.
 * Includes the header, main content area, and footer.
 */
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Site Header with Navigation */}
      <Header />
      
      {/* Main Content Area - Outlet renders the current route's component */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
