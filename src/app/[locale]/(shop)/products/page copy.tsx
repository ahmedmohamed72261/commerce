"use client";

import React, { useState, useEffect } from 'react';
import { 
  Home, ChevronsRight, Box, Layers, CheckCircle2,
  LayoutGrid, Rows2, Search, RefreshCcw
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
    <div className="min-h-screen bg-[#F4F5F7] text-slate-900 font-sans antialiased">
      
      {/* PROFESSIONAL NAVIGATOR (BREADCRUMB) */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <nav className="flex items-center gap-4">
            <div className="flex items-center gap-2 group cursor-pointer text-slate-400 hover:text-red-600 transition-colors">
              <Home size={16} />
              <span className="text-[11px] font-black uppercase tracking-tighter">Root</span>
            </div>
            <ChevronsRight size={14} className="text-slate-200" />
            <div className="flex items-center gap-2 group cursor-pointer text-slate-400 hover:text-red-600 transition-colors">
              <Box size={16} />
              <span className="text-[11px] font-black uppercase tracking-tighter">Inventory</span>
            </div>
            <ChevronsRight size={14} className="text-red-600" />
            <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full flex items-center gap-2">
              <Layers size={14} />
              <span className="text-[11px] font-black uppercase tracking-widest">Electronic_Components</span>
            </div>
          </nav>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">System Status</span>
              <span className="text-[11px] font-bold text-green-500 flex items-center gap-1">
                <CheckCircle2 size={12}/> ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR */}
        <ProductFilters />

        {/* MAIN PRODUCT AREA */}
        <main className="flex-1">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-8 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`h-10 px-4 rounded-lg flex items-center gap-2 transition-all ${viewMode === 'grid' ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <LayoutGrid size={16}/>
                <span className="text-[10px] font-black tracking-widest">GRID</span>
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`h-10 px-4 rounded-lg flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <Rows2 size={16}/>
                <span className="text-[10px] font-black tracking-widest">LIST_DUAL</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  placeholder="SEARCH_ID..." 
                  className="bg-slate-50 border border-slate-100 text-[10px] font-bold rounded-lg pl-9 pr-4 h-10 w-40 focus:w-60 focus:ring-1 focus:ring-red-600 outline-none transition-all" 
                />
              </div>
            </div>
          </div>

          {/* DYNAMIC GRID/LIST VIEW */}
          {loading && items.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <RefreshCcw className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
                <p className="text-slate-600 font-bold">Loading products...</p>
              </div>
            </div>
          ) : (
            <>
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "grid grid-cols-1 xl:grid-cols-2 gap-6"}>
                
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

              {/* PROFESSIONAL LOAD MORE */}
              {pagination.page < pagination.totalPages && (
                <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm overflow-hidden relative group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                    <div className="h-full w-1/4 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)] animate-pulse" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">
                      Inventory_Pagination: Page {pagination.page} of {pagination.totalPages}
                    </h4>
                    <Button 
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="h-14 px-12 rounded-2xl bg-white border-2 border-slate-100 text-slate-950 font-black text-[11px] tracking-[0.2em] uppercase hover:border-red-600 hover:text-red-600 hover:shadow-2xl transition-all flex gap-3 active:scale-95 disabled:opacity-50"
                    >
                      <RefreshCcw size={16} className={loading ? "animate-spin" : ""} /> 
                      Sync_Next_Data_Cluster
                    </Button>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                      Showing {items.length} of {pagination.total} products
                    </p>
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