"use client";

import React, { useEffect } from 'react';
import { useCategoriesStore } from '@/store/categories';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Cpu, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryProductsPageProps {
  params: Promise<{ locale: string; categoryId: string }>;
}

const CategoryProductsPage = async ({ params }: CategoryProductsPageProps) => {
  const { locale, categoryId } = await params;
  
  return <CategoryProductsClient locale={locale} categoryId={categoryId} />;
};

const CategoryProductsClient = ({ locale, categoryId }: { locale: string; categoryId: string }) => {
  const { getCategoryProducts, categoryProducts, categoryProductsLoading, error } = useCategoriesStore();

  useEffect(() => {
    getCategoryProducts(categoryId, locale as "en" | "ar");
  }, [categoryId, locale, getCategoryProducts]);

  if (categoryProductsLoading) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md">
          <p className="text-red-600 font-bold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!categoryProducts) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center">
        <p className="text-slate-600 font-bold">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-900 font-sans antialiased">
      <div className="max-w-[1600px] mx-auto px-6 py-10">
        
        {/* CATEGORY HEADER */}
        <div className="bg-white rounded-3xl p-8 mb-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-6">
            {categoryProducts.category.image && (
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <Image 
                  src={categoryProducts.category.image} 
                  alt={categoryProducts.category.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-slate-950 mb-2">
                {categoryProducts.category.name}
              </h1>
              <p className="text-slate-400 font-bold text-sm">
                {categoryProducts.count} Products Available
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.products.map((product) => (
            <Link
              key={product.id}
              href={`/${locale}/products/${product.id}`}
              className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-red-600/20 flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative aspect-[1.2/1] bg-slate-50 overflow-hidden">
                {product.image && (
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-black text-lg italic tracking-tighter uppercase text-slate-950 group-hover:text-red-600 transition-colors line-clamp-2 mb-4">
                  {product.name}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black italic tracking-tighter text-slate-950">
                      ${product.salePrice || product.price}
                    </span>
                    {product.salePrice && product.price > product.salePrice && (
                      <p className="text-[10px] font-bold text-slate-300 line-through">
                        ${product.price}
                      </p>
                    )}
                  </div>
                  <Button 
                    size="icon" 
                    className="h-12 w-12 rounded-xl bg-slate-950 text-white hover:bg-red-600 transition-all"
                  >
                    <ShoppingCart size={18} />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {categoryProducts.products.length === 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
            <p className="text-slate-600 font-bold text-lg">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;