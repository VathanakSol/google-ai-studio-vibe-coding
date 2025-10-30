
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartItems: CartItem[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  wishlistIds: string[];
}

const Navbar: React.FC<NavbarProps> = ({ cartItems, searchTerm, onSearchChange, wishlistIds }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900 p-4 shadow-md sticky top-0 z-50 backdrop-blur-md border-b border-blue-100 dark:border-slate-800">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-slate-800 dark:text-slate-100 text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex-shrink-0 flex items-center group">
          <div className="relative mr-3 transform group-hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z" className="fill-blue-600 dark:fill-blue-500"/>
              <path d="M12 16l8-6 8 6v12H12V16z" className="fill-white dark:fill-gray-900"/>
              <path d="M20 22a2 2 0 100-4 2 2 0 000 4z" className="fill-blue-600 dark:fill-blue-500"/>
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
              JomNum-Tech
            </span>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium tracking-wider">
              DIGITAL STORE
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="relative flex-grow max-w-lg w-full group">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-50/80 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 
            placeholder-blue-400 dark:placeholder-slate-500 
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-slate-800 
            transition-all duration-200 
            border border-blue-200 dark:border-slate-700/50 
            focus:border-blue-500 dark:focus:border-blue-500
            shadow-sm hover:shadow-md focus:shadow-lg"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search products by name"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-slate-500 group-focus-within:text-blue-600 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 
                p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/50
                transition-all duration-200"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-6 flex-shrink-0">
          {/* Wishlist Icon - Only show if authenticated */}
          {isAuthenticated && (
            <Link 
              to="/wishlist" 
              className="relative text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 
                p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800
                transform hover:scale-110  
                transition-all duration-300" 
              aria-label={`Wishlist with ${wishlistIds.length} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {wishlistIds.length > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold 
                    rounded-full h-5 w-5 flex items-center justify-center shadow-lg
                    animate-pulse" 
                  aria-live="polite" 
                  aria-atomic="true"
                >
                  {wishlistIds.length}
                </span>
              )}
            </Link>
          )}

          {/* Profile Section */}
          <div className="relative" ref={profileMenuRef}>
            {isAuthenticated ? (
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 
                  p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 
                  transition-all duration-300"
                aria-label="User profile menu"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop'}
                  alt={user?.firstName || 'User'}
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-200 dark:border-blue-800"
                />
                <span className="hidden md:block text-sm font-medium">
                  {user?.firstName}
                </span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && isAuthenticated && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Your Orders
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="relative text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 
              p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800
              transform hover:scale-110  
              transition-all duration-300" 
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span 
                className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold 
                  rounded-full h-5 w-5 flex items-center justify-center shadow-lg
                  animate-pulse" 
                aria-live="polite" 
                aria-atomic="true"
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
