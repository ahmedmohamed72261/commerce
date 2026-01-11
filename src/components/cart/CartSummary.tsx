"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';

interface CartSummaryProps {
  totalAmount: number;
  itemCount: number;
  onCheckout: () => void;
  onClearCart: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ 
  totalAmount, 
  itemCount,
  onCheckout,
  onClearCart
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 sticky top-6">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b border-slate-100 pb-4">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-slate-600 font-bold">Subtotal ({itemCount} items)</span>
          <span className="text-lg font-black">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600 font-bold">Shipping</span>
          <span className="text-sm font-bold text-green-600">FREE</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600 font-bold">Tax</span>
          <span className="text-lg font-black">$0.00</span>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-black uppercase">Total</span>
          <span className="text-3xl font-black text-red-600 tracking-tighter">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <Button 
        onClick={onCheckout}
        className="w-full h-14 bg-red-600 hover:bg-black text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 mb-3"
      >
        <ShoppingCart className="mr-2" size={18} />
        Proceed to Checkout
      </Button>

      <Button 
        onClick={onClearCart}
        variant="outline"
        className="w-full h-12 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
      >
        <Trash2 className="mr-2" size={16} />
        Clear Cart
      </Button>
    </div>
  );
};
