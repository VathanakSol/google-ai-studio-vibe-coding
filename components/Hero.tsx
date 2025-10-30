
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CAROUSEL_IMAGES } from '../constants';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000); // Change image every 7 seconds
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {CAROUSEL_IMAGES.map((imageUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                      ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          role="img"
          aria-label={`Hero image slide ${index + 1}`}
        >
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
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

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full bg-white transition-all duration-300
                        ${index === currentImageIndex ? 'w-8 bg-blue-500' : 'bg-opacity-50 hover:bg-opacity-75'}`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
