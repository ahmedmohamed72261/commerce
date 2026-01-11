"use client";

import React, { useState, useEffect } from 'react';
import { 
  Home, ChevronsRight, Box, Layers, CheckCircle2,
  LayoutGrid, List, Search, RefreshCcw, ChevronDown, 
  SlidersHorizontal, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProductsStore } from '@/store/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { useCart } from '@/store/cart';
import { toast } from 'sonner';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { locale } = await params;
  return <ProductsPageClient locale={locale} />;
};

const ProductsPageClient = ({ locale }: { locale: string }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { items, loading, fetch, pagination, setPage } = useProductsStore();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch({ locale: locale as "en" | "ar" });
  }, [locale, fetch]);

  const handleAddToCart = async (productId: string | number) => {
    const success = await addToCart(String(productId), 1);
    if (success) {
      toast.success('Added to cart!');
    } else {
      toast.error('Failed to add to cart');
    }
  };

  const handleLoadMore = async () => {
    if (pagination.page < pagination.totalPages) {
      await setPage(pagination.page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0F172A] font-sans antialiased">
      
      {/* 1. BREADCRUMB NAVIGATOR */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
          <nav className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer">
              <Home size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
            </div>
            <ChevronsRight size={12} className="text-slate-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]">Shop</span>
          </nav>
          
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold text-green-500 flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live_Inventory
             </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-10">
        
        {/* 2. SIDEBAR FILTERS (Styled like image_8a566e) */}
        <aside className="w-full lg:w-[280px] shrink-0 space-y-10">
          <ProductFilters />
        </aside>

        {/* 3. MAIN PRODUCT GRID AREA */}
        <main className="flex-1">
          
          {/* Header Controls (Matching Image Toolbar) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Shop</h1>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* View Switches */}
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-2.5 transition-all ${viewMode === 'grid' ? 'bg-[#0F172A] text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <LayoutGrid size={18}/>
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-2.5 transition-all border-l border-slate-200 ${viewMode === 'list' ? 'bg-[#0F172A] text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <List size={18}/>
                </button>
              </div>

              {/* Sort & Limit Dropdowns (As seen in reference image) */}
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg px-4 pr-10 h-11 text-xs font-bold text-[#0F172A] focus:ring-2 focus:ring-red-600/10 outline-none cursor-pointer shadow-sm">
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
                
                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg px-4 pr-10 h-11 text-xs font-bold text-[#0F172A] focus:ring-2 focus:ring-red-600/10 outline-none cursor-pointer shadow-sm">
                    <option>20</option>
                    <option>40</option>
                    <option>60</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC PRODUCT DISPLAY */}
          {loading && items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2rem] border border-dashed border-slate-200">
              <RefreshCcw className="w-10 h-10 animate-spin text-red-600 mb-4" />
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Fetching_Assets...</p>
            </div>
          ) : (
            <>
              {/* Product Cards Layout */}
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6" 
                : "flex flex-col gap-4"}>
                
                {items.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                    locale={locale}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* ENHANCED LOAD MORE (Command Center Style) */}
              {pagination.page < pagination.totalPages && (
                <div className="mt-12 p-1 bg-[#0F172A] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <div className="bg-white rounded-[2.4rem] p-12 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-600 rounded-b-full shadow-[0_4px_10px_rgba(220,38,38,0.3)]" />
                    
                    <div className="flex flex-col items-center gap-6">
                      <div className="space-y-1">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                          Registry_Sync_Status
                        </h4>
                        <p className="text-sm font-bold text-[#0F172A]">
                          Displayed: {items.length} <span className="text-slate-300">/</span> Total: {pagination.total}
                        </p>
                      </div>

                      <Button 
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="h-16 px-16 rounded-2xl bg-[#0F172A] text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-red-600 hover:shadow-[0_20px_40px_-12px_rgba(220,38,38,0.4)] transition-all flex gap-4 active:scale-95 disabled:opacity-50"
                      >
                        {loading ? <RefreshCcw size={18} className="animate-spin" /> : <SlidersHorizontal size={18} />}
                        Sync_Next_Data_Cluster
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;