
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, Review } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ImageGallery from './ImageGallery';
import QuantityControl from './QuantityControl';

interface ProductDetailProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Review System State
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [newReviewRating, setNewReviewRating] = useState<number>(0);
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Load product data
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const foundProduct = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setQuantity(1); // Reset quantity when product changes
    } else {
      setError('Product not found.');
    }
    setIsLoading(false);
  }, [productId]);

  // Load reviews from localStorage
  useEffect(() => {
    try {
      const storedReviews = localStorage.getItem('productReviews');
      if (storedReviews) {
        setAllReviews(JSON.parse(storedReviews));
      }
    } catch (e) {
      console.error("Failed to load reviews from localStorage", e);
    }
  }, []);

  // Filter reviews for the current product
  const productReviews = useMemo(() => {
    return allReviews.filter(review => review.productId === productId);
  }, [allReviews, productId]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      onAddToCart(product, quantity);
      navigate('/cart'); // Redirect to cart after adding
    }
  }, [product, quantity, onAddToCart, navigate]);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    if (product && newQuantity > product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(newQuantity);
    }
  }, [product]);

  const handleSubmitReview = useCallback(() => {
    setReviewError(null);
    if (newReviewRating === 0) {
      setReviewError('Please select a star rating.');
      return;
    }
    if (newReviewComment.trim() === '') {
      setReviewError('Please write a comment for your review.');
      return;
    }

    if (product) {
      const newReview: Review = {
        id: Date.now().toString(), // Simple unique ID
        productId: product.id,
        rating: newReviewRating,
        comment: newReviewComment.trim(),
        timestamp: Date.now(),
      };

      const updatedReviews = [...allReviews, newReview];
      setAllReviews(updatedReviews);
      localStorage.setItem('productReviews', JSON.stringify(updatedReviews));

      // Reset form
      setNewReviewRating(0);
      setNewReviewComment('');
    }
  }, [newReviewRating, newReviewComment, product, allReviews]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-screen-minus-nav-footer">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center text-red-600 text-xl min-h-screen-minus-nav-footer">
        {error}
        <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Back to Home
        </button>
      </div>
    );
  }

  if (!product) {
    return null; // Should ideally be handled by error state
  }

  const isOutOfStock = product.stock === 0;
  const availableStockMessage = product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock';

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-xl shadow-lg my-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <ImageGallery images={product.imageUrls} alt={product.name} />

        <div className="w-full lg:w-1/2 p-4 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-xl md:text-2xl font-bold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 text-sm mb-4">
            Category: <span className="font-medium text-blue-700">{product.category}</span>
          </p>
          <p className="text-gray-800 leading-relaxed mb-6 flex-grow">
            {product.longDescription}
          </p>

          <div className="flex items-center mb-6 space-x-4">
            <span className={`text-sm font-semibold ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
              {availableStockMessage}
            </span>
            {!isOutOfStock && (
              <QuantityControl
                quantity={quantity}
                onUpdateQuantity={handleQuantityChange}
                maxQuantity={product.stock}
              />
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`
              w-full py-3 px-6 rounded-lg text-white font-semibold text-lg
              transition-all duration-300
              ${isOutOfStock
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
              }
            `}
          >
            {isOutOfStock ? 'Out of Stock' : `Add ${quantity} to Cart`}
          </button>
        </div>
      </div>

      {/* Product Reviews Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

        {/* Existing Reviews */}
        {productReviews.length > 0 ? (
          <div className="space-y-6">
            {productReviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${review.rating >= star ? 'fill-current' : 'fill-gray-300'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.045a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.817-2.045a1 1 0 00-1.175 0l-2.817 2.045c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.363-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-gray-500">
                    {new Date(review.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-800 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mb-8">No reviews yet. Be the first to review this product!</p>
        )}

        {/* Add Review Form */}
        <div className="mt-10 p-6 bg-blue-50 rounded-lg shadow-md border border-blue-100">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Write a Review</h3>
          {reviewError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{reviewError}</span>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700 text-sm font-semibold mb-2">
              Your Rating
            </label>
            <div className="flex space-x-1" role="radiogroup" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`${star} out of 5 stars`}
                  role="radio"
                  aria-checked={newReviewRating === star}
                  onClick={() => setNewReviewRating(star)}
                  className={`
                    text-2xl transition-colors duration-200
                    ${newReviewRating >= star ? 'text-yellow-400' : 'text-gray-300'}
                    hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500
                  `}
                >
                  &#9733; {/* Unicode star character */}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="reviewComment" className="block text-gray-700 text-sm font-semibold mb-2">
              Your Comment
            </label>
            <textarea
              id="reviewComment"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-y"
              rows={4}
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              aria-required="true"
            ></textarea>
          </div>
          <button
            onClick={handleSubmitReview}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:ring-4 focus:ring-blue-300"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
