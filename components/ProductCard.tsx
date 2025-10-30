
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">
      <Link to={`/product/${product.id}`} className="block relative h-48 sm:h-56 overflow-hidden">
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center text-white text-xl font-bold">
            Out of Stock
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 truncate">
          <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-auto pt-2">
          <span className="text-xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product, 1)}
            disabled={product.stock === 0}
            className={`
              bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transition-colors duration-300
              ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
