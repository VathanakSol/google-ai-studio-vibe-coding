
import React, { useCallback, useMemo } from 'react';
import { CartItem, Product } from '../types';
import QuantityControl from './QuantityControl';
import { Link } from 'react-router-dom';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const handleQuantityChange = useCallback((product: Product, newQuantity: number) => {
    onUpdateQuantity(product.id, newQuantity);
  }, [onUpdateQuantity]);

  const handleRemoveItem = useCallback((productId: string) => {
    onRemoveItem(productId);
  }, [onRemoveItem]);

  const handleCheckoutClick = useCallback(() => {
    alert('Proceeding to checkout! (This is a mock checkout)');
    onCheckout();
  }, [onCheckout]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 my-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row items-center justify-between border-b last:border-b-0 py-6"
              >
                <div className="flex items-center flex-grow mb-4 sm:mb-0">
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.imageUrls[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-md shadow-sm mr-4"
                    />
                  </Link>
                  <div className="text-center sm:text-left">
                    <Link to={`/product/${item.product.id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-gray-600 text-sm">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <QuantityControl
                    quantity={item.quantity}
                    onUpdateQuantity={(newQty) => handleQuantityChange(item.product, newQty)}
                    maxQuantity={item.product.stock}
                  />
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md sticky top-24 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">Order Summary</h2>
            <div className="flex justify-between items-center text-lg mb-3">
              <span>Subtotal:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg mb-6">
              <span>Shipping:</span>
              <span className="font-semibold">Free</span> {/* Assuming free shipping for simplicity */}
            </div>
            <div className="flex justify-between items-center text-2xl font-bold text-gray-900 border-t pt-4">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckoutClick}
              className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors duration-300 focus:ring-4 focus:ring-green-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
