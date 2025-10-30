import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface WishlistProps {
  wishlistIds: string[];
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlistIds, onAddToCart, onToggleWishlist }) => {
  const wishlistedProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => wishlistIds.includes(product.id));
  }, [wishlistIds]);

  const handleMoveToCart = useCallback((product: Product) => {
    onAddToCart(product, 1); // Add one quantity to cart
    onToggleWishlist(product.id); // Remove from wishlist after moving to cart
  }, [onAddToCart, onToggleWishlist]);

  const handleRemoveFromWishlist = useCallback((productId: string) => {
    onToggleWishlist(productId);
  }, [onToggleWishlist]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 my-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">Your Wishlist</h1>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">Your wishlist is empty.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center flex-grow mb-4 sm:mb-0">
                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md shadow-sm mr-4"
                  />
                </Link>
                <div className="text-center sm:text-left">
                  <Link to={`/product/${product.id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-gray-600 text-sm">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300 focus:ring-4 focus:ring-green-300 flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Move to Cart</span>
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-300 focus:ring-4 focus:ring-red-300 flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;