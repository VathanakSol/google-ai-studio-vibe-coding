
import React from 'react';

interface QuantityControlProps {
  quantity: number;
  onUpdateQuantity: (newQuantity: number) => void;
  maxQuantity?: number;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onUpdateQuantity, maxQuantity }) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (maxQuantity === undefined || quantity < maxQuantity) {
      onUpdateQuantity(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      if (maxQuantity === undefined || value <= maxQuantity) {
        onUpdateQuantity(value);
      } else {
        onUpdateQuantity(maxQuantity);
      }
    } else if (e.target.value === '') {
      onUpdateQuantity(1); // Or allow empty temporarily for user input, then correct
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        -
      </button>
      <input
        type="number"
        min="1"
        max={maxQuantity}
        value={quantity}
        onChange={handleChange}
        className="w-16 text-center border border-gray-300 rounded-md py-1 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleIncrement}
        disabled={maxQuantity !== undefined && quantity >= maxQuantity}
        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
