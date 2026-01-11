"use client";

import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductFiltersProps {
  onFilterChange?: (filters: any) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange }) => {
  return (
    <aside className="lg:w-[300px] shrink-0 space-y-8">
      
      {/* 1. BROWSE CATEGORIES (Matches image_8a566e) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b-2 border-slate-100">
          Browse Categories
        </h2>
        <nav className="flex flex-col">
          {[
            'Electronics', 'Men\'s Fashion', 'Consumer Electronics', 
            'Watches', 'Home Appliances', 'Backpacks', 'Women\'s Fashion'
          ].map((cat) => (
            <button 
              key={cat} 
              className="flex items-center gap-2 py-3 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors group border-b border-slate-50 last:border-0"
            >
              <ChevronRight size={14} className="text-slate-300 group-hover:text-red-600 transition-transform group-hover:translate-x-1" />
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* 2. PRICE FILTER (Matches image_8a56aa) */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b-2 border-slate-100">
          Filters
        </h2>
        
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700">Price</label>
          
          <div className="flex items-center gap-3">
            <input 
              type="number" 
              placeholder="2" 
              className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all"
            />
            <span className="text-slate-400">—</span>
            <input 
              type="number" 
              placeholder="7499" 
              className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all"
            />
          </div>

          {/* Custom Range Slider Styling */}
          <div className="relative pt-4">
            <div className="h-1 w-full bg-slate-100 rounded-full relative">
              <div className="absolute h-full bg-red-600 left-[5%] right-[20%] rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[5%] w-4 h-4 bg-white border-2 border-red-600 rounded-full cursor-pointer shadow-sm" />
              <div className="absolute top-1/2 -translate-y-1/2 right-[20%] w-4 h-4 bg-white border-2 border-red-600 rounded-full cursor-pointer shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. LATEST PRODUCTS (Matches left sidebar in image_8a56aa) */}
      <div className="space-y-6 pt-4">
        <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b-2 border-slate-100">
          Latest Products
        </h2>
        
        <div className="space-y-5">
          {[
            { name: "Sennheiser Momentum 4", price: 255, oldPrice: 350, img: "/p1.jpg" },
            { name: "Bose QuietComfort", price: 349, oldPrice: null, img: "/p2.jpg" },
            { name: "Beats Studio Buds +", price: 170, oldPrice: null, img: "/p3.jpg" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 group-hover:border-red-200 transition-colors">
                 <div className="w-full h-full bg-slate-200 rounded flex items-center justify-center text-[8px] text-slate-400">IMG</div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs font-bold text-[#0F172A] line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-black text-red-600">${item.price}</span>
                  {item.oldPrice && (
                    <span className="text-[10px] text-slate-400 line-through">${item.oldPrice}</span>
                  )}
                </div>
                {/* Mini Stars */}
                <div className="flex items-center gap-0.5 mt-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="currentColor" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full h-11 bg-[#0F172A] hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-all shadow-md">
        Apply Filters
      </Button>
    </aside>
  );
};