"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Trash2, 
  ShoppingBag, 
  Zap,
  ChevronRight,
  ArrowUpRight,
  Heart
} from 'lucide-react';

const WishlistPage = () => {
  const wishlistItems = [
    { id: 1, name: 'MH02-Black09', price: 350.00, inStock: true, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&h=300&auto=format&fit=crop' },
    { id: 2, name: 'Voyage Yoga Bag', price: 350.00, inStock: false, image: 'https://images.unsplash.com/photo-1583944061249-fa5ffc9128d5?q=80&w=300&h=300&auto=format&fit=crop' },
    { id: 3, name: 'Wayfarer Messenger Bag5', price: 350.00, inStock: true, image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=300&h=300&auto=format&fit=crop' },
    { id: 4, name: 'Wayfarer Messenger Bag', price: 350.00, inStock: true, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=300&h=300&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans pb-20">
      
      {/* 1. CLEAN BREADCRUMB - CENTERED */}
      <div className="w-full bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="/" className="hover:text-red-600">Home</a>
            <ChevronRight size={12} />
            <span className="text-slate-900">Wishlist Archive</span>
          </nav>
          <div className="flex items-center gap-2 text-red-600 font-bold text-[10px] uppercase italic">
            <Zap size={14} fill="currentColor" /> Live Registry
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {/* 2. HEADER - CONSTRAINED */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
              FAV<span className="text-red-600">ORITES</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Strategic Asset Selection / 2026</p>
          </div>
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl min-w-[200px]">
             <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Total Items</p>
             <p className="text-4xl font-black italic">0{wishlistItems.length}</p>
          </div>
        </header>

        {/* 3. WISHLIST GRID - NOT STRETCHED */}
        <div className="grid gap-4">
          {wishlistItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row items-center">
                
                {/* IMAGE AREA */}
                <div className="w-full md:w-48 h-48 relative bg-slate-100 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white font-black uppercase text-xs border border-white px-3 py-1 -rotate-12">Sold Out</span>
                    </div>
                  )}
                </div>

                {/* INFO AREA */}
                <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-red-600 uppercase tracking-widest">Model Ref: #{item.id}226</p>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">{item.name}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      {item.inStock ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase"><CheckCircle size={12}/> In Stock</span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 uppercase"><XCircle size={12}/> Limited</span>
                      )}
                      <span className="text-[10px] font-bold text-slate-300 uppercase">Valuation: ${item.price}</span>
                    </div>
                  </div>

                  {/* ACTIONS AREA */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button 
                      disabled={!item.inStock}
                      className="flex-1 md:flex-none h-14 px-8 bg-slate-900 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase italic transition-all group/btn"
                    >
                      Add to Cart <ShoppingBag className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <button className="h-14 w-14 flex items-center justify-center bg-slate-50 hover:bg-red-50 text-slate-300 hover:text-red-600 rounded-xl transition-colors border border-slate-100">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. FOOTER SUMMARY - CENTERED */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm gap-8">
           <div className="flex items-center gap-6">
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-red-600 transition-colors flex items-center gap-2">
                <ArrowRight className="rotate-180" size={14} /> Back to Scouting
              </button>
              <div className="h-8 w-[1px] bg-slate-100 hidden md:block"></div>
              <p className="text-xs font-bold text-slate-400 uppercase italic">
                All selections are held for <span className="text-slate-900">24 hours</span>
              </p>
           </div>
           
           <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="text-right hidden md:block">
                <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Total Valuation</p>
                <p className="text-2xl font-black italic">$1,400.00</p>
              </div>
              <Button className="w-full md:w-auto h-16 px-12 bg-red-600 hover:bg-slate-900 text-white rounded-2xl text-sm font-black uppercase italic transition-all shadow-lg shadow-red-200">
                 Deploy All to Cart <Zap className="ml-3 w-4 h-4 fill-current" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;