"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const t = useTranslations('Product');

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
        <div className="flex items-center justify-center h-full text-muted-foreground">
          {t('noImage')}
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
    <div className="space-y-6 w-full">
      {/* Main Image */}
      <div className="relative aspect-square md:aspect-[4/3] max-h-[500px] rounded-xl overflow-hidden bg-muted border border-border group w-full mx-auto">
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
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-card/90 dark:bg-black/50 hover:bg-card dark:hover:bg-black/70 p-2 sm:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
              <ChevronLeft size={15} className="text-foreground dark:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-card/90 dark:bg-black/50 hover:bg-card dark:hover:bg-black/70 p-2 sm:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
              <ChevronRight size={15} className="text-foreground dark:text-white" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] sm:text-xs font-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
            {selectedImg + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-4">
          {images.map((img, index) => (
            <button 
              key={index}
              onClick={() => setSelectedImg(index)}
              className={`relative aspect-square rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                selectedImg === index 
                  ? 'border-red-600 dark:border-primary scale-105 shadow-md ring-2 ring-red-600/20 dark:ring-primary/20' 
                  : 'border-border opacity-60 hover:opacity-100 hover:border-muted-foreground'
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
