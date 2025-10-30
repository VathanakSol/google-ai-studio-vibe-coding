
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { Product, CartItem, Category } from './types';
import { MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (selectedCategory === Category.All) {
      setFilteredProducts(MOCK_PRODUCTS);
    } else {
      setFilteredProducts(MOCK_PRODUCTS.filter((product) => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleAddToCart = useCallback((product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const currentTotal = updatedItems[existingItemIndex].quantity;
        const newQuantity = Math.min(product.stock, currentTotal + quantity);
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity,
        };
        return updatedItems;
      } else {
        const newQuantity = Math.min(product.stock, quantity);
        return [...prevItems, { product, quantity: newQuantity }];
      }
    });
  }, []);

  const handleUpdateCartQuantity = useCallback((productId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.product.id === productId) {
          const quantityToSet = Math.max(1, Math.min(newQuantity, item.product.stock));
          return { ...item, quantity: quantityToSet };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove if quantity goes to 0 (though QuantityControl prevents less than 1)
      return updatedItems;
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }, []);

  const handleCheckout = useCallback(() => {
    setCartItems([]); // Clear cart after checkout
    // In a real app, this would involve payment processing and order creation.
  }, []);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cartItems={cartItems} />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <div className="container mx-auto p-4 md:p-6 lg:p-8 mt-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Our Products</h2>
                    <CategoryFilter
                      onSelectCategory={handleSelectCategory}
                      selectedCategory={selectedCategory}
                    />
                    <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
                  </div>
                </>
              }
            />
            <Route
              path="/product/:productId"
              element={<ProductDetail onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateCartQuantity}
                  onRemoveItem={handleRemoveFromCart}
                  onCheckout={handleCheckout}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
