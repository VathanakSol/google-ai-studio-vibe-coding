import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist'; // Import the new Wishlist component
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
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlistIds');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error("Failed to parse wishlist IDs from localStorage:", error);
      return [];
    }
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistIds', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    let productsToFilter = MOCK_PRODUCTS;

    if (selectedCategory !== Category.All) {
      productsToFilter = productsToFilter.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      productsToFilter = productsToFilter.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.longDescription.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredProducts(productsToFilter);
  }, [selectedCategory, searchTerm]); // Add searchTerm to dependencies

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
    setSearchTerm(''); // Clear search when category changes
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setSelectedCategory(Category.All); // Clear category filter when search term changes
  }, []);

  const handleToggleWishlist = useCallback((productId: string) => {
    setWishlistIds((prevIds) => {
      if (prevIds.includes(productId)) {
        return prevIds.filter((id) => id !== productId);
      } else {
        return [...prevIds, productId];
      }
    });
  }, []);


  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar
          cartItems={cartItems}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
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
                    {filteredProducts.length === 0 && (
                      <p className="text-center text-xl text-gray-600 my-8">No products found matching your criteria.</p>
                    )}
                    <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} wishlistIds={wishlistIds} />
                  </div>
                </>
              }
            />
            <Route
              path="/product/:productId"
              element={<ProductDetail onAddToCart={handleAddToCart} wishlistIds={wishlistIds} onToggleWishlist={handleToggleWishlist} />}
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
            {/* New Wishlist Route */}
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlistIds={wishlistIds}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
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