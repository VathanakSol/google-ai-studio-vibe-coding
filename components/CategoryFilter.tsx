
import React from 'react';
import { Category } from '../types';
import { ALL_CATEGORIES } from '../constants';

interface CategoryFilterProps {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 p-4 bg-white shadow-sm rounded-lg mb-6">
      {ALL_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${selectedCategory === category
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
