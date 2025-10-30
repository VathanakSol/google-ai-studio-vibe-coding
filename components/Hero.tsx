
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-16 md:py-24 text-center shadow-inner">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 animate-fade-in-down">
          Discover Your Next Favorite Item
        </h1>
        <p className="text-lg sm:text-xl mb-8 opacity-90 animate-fade-in-up">
          Explore a curated collection of high-quality products.
        </p>
        <Link
          to="/"
          className="inline-block bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 transform"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
