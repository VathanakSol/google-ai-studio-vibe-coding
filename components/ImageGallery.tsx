
import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full lg:w-1/2 p-4">
      <div className="mb-4 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg">
        <img
          src={mainImage}
          alt={alt}
          className="w-full h-full object-contain bg-gray-100"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${alt} thumbnail ${index + 1}`}
            className={`
              w-full h-20 object-cover rounded-md cursor-pointer border-2
              ${img === mainImage ? 'border-blue-600 scale-105' : 'border-transparent'}
              hover:border-blue-500 transition-all duration-200
            `}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
