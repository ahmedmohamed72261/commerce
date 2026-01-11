"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Cpu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/store/products';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  locale?: string;
  onAddToCart?: (productId: string | number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  viewMode,
  locale = 'en',
  onAddToCart
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <Link
      href={`/${locale}/products/${product.id}`}
      className={`group bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-red-600/20 flex ${viewMode === 'list' ? 'h-64' : 'flex-col'}`}
    >
      {/* IMAGE AREA */}
      <div className={`relative bg-slate-50 overflow-hidden transition-all duration-500 ${viewMode === 'list' ? 'w-56 shrink-0' : 'aspect-[1.2/1]'}`}>
        {product.image && (
          <Image 
            src={product.image} 
            alt={product.title} 
            fill 
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
          />
        )}
        {product.category && (
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            {product.category}
          </div>
        )}
        {product.stock !== undefined && product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-black text-lg italic tracking-tighter uppercase text-slate-950 group-hover:text-red-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
          {product.rating && (
            <div className="flex text-yellow-400">
              <Star size={10} fill="currentColor"/>
            </div>
          )}
        </div>

        {(product.brand || product.condition) && (
          <div className="flex items-center gap-4 mb-6">
            {product.brand && (
              <div className="flex items-center gap-1.5 text-slate-400">
                <Cpu size={14} className="text-red-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase">{product.brand}</span>
              </div>
            )}
            {product.brand && product.condition && (
              <div className="h-3 w-[1px] bg-slate-200" />
            )}
            {product.condition && (
              <div className="flex items-center gap-1.5 text-slate-400">
                <Zap size={14} className="text-red-600" />
                <span className="text-[10px] font-bold tracking-widest uppercase">{product.condition}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-2xl font-black italic tracking-tighter text-slate-950">
              ${product.salePrice || product.price}
            </span>
            {product.salePrice && product.price > product.salePrice && (
              <p className="text-[10px] font-bold text-slate-300 line-through">${product.price}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-10 w-10 rounded-xl hover:bg-red-50 hover:text-red-600"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart size={18}/>
            </Button>
            <Button 
              className="h-12 px-6 rounded-xl bg-slate-950 text-white font-black text-[10px] tracking-widest uppercase hover:bg-red-600 transition-all flex gap-2"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={16} /> ADD
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
