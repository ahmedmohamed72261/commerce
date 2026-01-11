"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Activity, ArrowRight, Star, ShieldCheck, Zap, Cpu
} from 'lucide-react';
import { Category } from '@/store/categories';

interface CategoryCardProps {
  category: Category;
  viewMode: 'grid' | 'list';
  locale?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  viewMode,
  locale = 'en' 
}) => {
  return (
    <Link 
      href={`/${locale}/categories/${category.id}`}
      className={`group bg-white border border-slate-200/60 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${viewMode === 'grid' 
          ? 'rounded-[2.5rem] p-5 flex flex-col hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-red-600/20' 
          : 'rounded-3xl p-5 flex items-center gap-10 hover:shadow-xl hover:border-red-600/20'
        }`}
    >
      {/* IMAGE / PREVIEW */}
      <div className={`relative overflow-hidden bg-slate-100 rounded-[1.8rem] shrink-0
        ${viewMode === 'grid' ? 'h-60 w-full mb-8' : 'h-36 w-56'}`}>
        {category.image && (
          <Image 
            src={category.image} 
            alt={category.name} 
            fill 
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 group-hover:rotate-1" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {viewMode === 'grid' && category.count && (
          <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-tighter border border-white/10 shadow-2xl">
            <Activity size={10} className="text-red-500" /> {category.count} Products
          </div>
        )}
      </div>

      {/* TEXT CONTENT */}
      <div className="flex-1 flex flex-col px-1">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-red-600 transition-colors duration-300">
              {category.name}
            </h3>
            {category.tag && (
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-slate-600 transition-colors">
                <Cpu size={12} className="text-red-500/50" /> {category.tag}
              </p>
            )}
          </div>
          {viewMode === 'list' && category.count && (
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1 leading-none">Products</p>
              <p className="text-3xl font-black italic text-slate-900 leading-none tracking-tighter">{category.count}</p>
            </div>
          )}
        </div>

        {/* STATUS BADGES */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200/50 flex items-center gap-1.5 group-hover:bg-white transition-colors">
            <ShieldCheck size={11} className="text-slate-400" /> Certified
          </span>
          <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full border flex items-center gap-1.5 shadow-sm transition-all bg-green-50 text-green-600 border-green-100">
            <Zap size={11} fill="currentColor" className="animate-pulse" /> In Stock
          </span>
        </div>

        {/* ACTION BUTTON */}
        <div className={`mt-auto pt-8 flex items-center justify-between 
          ${viewMode === 'grid' ? 'border-t border-slate-100' : 'hidden md:flex'}`}>
          {viewMode === 'grid' && (
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
              <Star size={10} fill="#facc15" className="text-yellow-400" />
              <span className="text-[10px] font-black text-slate-600">4.9</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 group-hover:text-red-600 transition-all duration-300">
            Access Sector 
            <div className="bg-slate-100 p-2 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
              <ArrowRight size={14} className="group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
