"use client";

import React, { useState } from 'react';
import { ChevronRight, LayoutGrid, List, Cpu } from 'lucide-react';
import { CategoryList } from '@/components/categories/CategoryList';

interface CategoriesPageProps {
  params: Promise<{ locale: string }>;
}

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const { locale } = await params;
  
  return <CategoriesPageClient locale={locale} />;
};

const CategoriesPageClient = ({ locale }: { locale: string }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-[#F6F6F7] text-slate-900 font-sans antialiased selection:bg-red-100 selection:text-red-600">
      
      {/* SHOP UTILITY NAVIGATION */}
      <nav className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <span className="hover:text-red-600 transition-colors cursor-pointer">Hub</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-red-600">Electronic Sector</span>
          </div>
          
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-red-600 shadow-md ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-red-600 shadow-md ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-8 py-16">
        <header className="mb-14 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold text-[10px] uppercase tracking-[0.5em] animate-in fade-in slide-in-from-left-4 duration-1000">
              <Cpu size={14} className="animate-pulse" /> Industrial Registry
            </div>
            <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-slate-950">
              Asset <span className="text-red-600 drop-shadow-sm">Inventory</span>
            </h1>
          </div>
        </header>

        <CategoryList viewMode={viewMode} locale={locale} />
      </main>
    </div>
  );
};

export default CategoriesPage;