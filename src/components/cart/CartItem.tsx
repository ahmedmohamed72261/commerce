"use client";

import React from 'react';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/store/cart';

interface CartItemProps {
  item: CartItemType;
  locale?: string;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  locale = 'en',
  onUpdateQuantity,
  onRemove
}) => {
  const productName = typeof item.product.name === 'object' 
    ? item.product.name[locale as 'en' | 'ar'] || item.product.name.en
    : item.product.name;

  const productImage = item.product.images?.[0] || '';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-6 items-center hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-50 shrink-0">
        {productImage && (
          <Image 
            src={productImage} 
            alt={productName} 
            fill 
            className="object-cover" 
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-black text-lg tracking-tight uppercase mb-1">
          {productName}
        </h3>
        <p className="text-sm text-slate-400 font-bold">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
          className="hover:text-red-600 h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="px-4 text-sm font-black min-w-[2rem] text-center">
          {item.quantity}
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
          className="hover:text-red-600 h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-[100px]">
        <p className="text-2xl font-black text-slate-950 tracking-tighter">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onRemove(item._id)}
        className="hover:bg-red-50 hover:text-red-600 h-10 w-10 rounded-xl"
      >
        <X size={18} />
      </Button>
    </div>
  );
};
