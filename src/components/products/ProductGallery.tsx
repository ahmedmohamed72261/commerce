"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImg, setSelectedImg] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
        <div className="flex items-center justify-center h-full text-slate-400">
          No image available
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    setSelectedImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group">
        <Image 
          src={images[selectedImg]} 
          alt={`${productName} - Image ${selectedImg + 1}`} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
          priority
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} className="text-slate-900" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} className="text-slate-900" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full">
            {selectedImg + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-4">
          {images.map((img, index) => (
            <button 
              key={index}
              onClick={() => setSelectedImg(index)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                selectedImg === index 
                  ? 'border-red-600 scale-105 shadow-md ring-2 ring-red-600/20' 
                  : 'border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-300'
              }`}
            >
              <Image 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                fill 
                className="object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
