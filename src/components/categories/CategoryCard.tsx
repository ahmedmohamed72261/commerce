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
      className={`group bg-white dark:bg-card border border-slate-200/60 dark:border-border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${viewMode === 'grid' 
          ? 'rounded-2xl p-2 flex flex-col hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:border-red-600/20 dark:hover:border-primary/20' 
          : 'rounded-2xl p-2 flex items-center gap-10 hover:shadow-xl dark:hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] hover:border-red-600/20 dark:hover:border-primary/20'
        }`}
    >
      {/* IMAGE / PREVIEW */}
      <div className={`relative overflow-hidden bg-slate-100 dark:bg-muted rounded-2xl shrink-0
        ${viewMode === 'grid' ? 'md:h-60 h-40 w-full mb-2' : 'h-15 w-15'}`}>
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
          <div className="absolute bottom-2 left-4 bg-slate-950/80 dark:bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-tighter border border-white/10 shadow-2xl">
            <Activity size={10} className="text-red-500 dark:text-primary" /> {category.count} Products
          </div>
        )}
      </div>

      {/* TEXT CONTENT */}
      <div className="flex-1 flex flex-col px-1">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="md:text-2xl text-sm font-black uppercase  tracking-tighter group-hover:text-red-600 dark:group-hover:text-primary transition-colors duration-300">
              {category.name}
            </h3>
            {category.tag && (
              <p className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-widest flex items-center gap-2 group-hover:text-slate-600 dark:group-hover:text-foreground transition-colors">
                <Cpu size={12} className="text-red-500/50 dark:text-primary/50" /> {category.tag}
              </p>
            )}
          </div>
          {viewMode === 'list' && category.count && (
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-300 dark:text-muted-foreground uppercase tracking-[0.3em] mb-1 leading-none">Products</p>
              <p className="text-3xl font-black  text-slate-900 dark:text-foreground leading-none tracking-tighter">{category.count}</p>
            </div>
          )}
        </div>

        {/* STATUS BADGES */}
        <div className="flex flex-wrap gap-2 mt-2">
          {/* <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200/50 flex items-center gap-1.5 group-hover:bg-white transition-colors">
            <ShieldCheck size={10} className="text-slate-400" /> Certified
          </span> */}
          {/* <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full border flex items-center gap-1.5 shadow-sm transition-all bg-green-50 text-green-600 border-green-100">
            <Zap size={10} fill="currentColor" className="animate-pulse" /> In Stock
          </span> */}
        </div>

        {/* ACTION BUTTON */}
        <div className={`mt-auto py-2 flex items-center justify-between 
          ${viewMode === 'grid' ? 'border-t border-slate-100 dark:border-border' : 'hidden md:flex'}`}>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 text-white group-hover:text-red-600 dark:group-hover:text-primary transition-all duration-300">
            <div className="bg-red-600  p-2 rounded-full group-hover:bg-red-400 dark:group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ArrowRight size={14} className="group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
