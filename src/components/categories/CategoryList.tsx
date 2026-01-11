"use client";

import React, { useEffect } from 'react';
import { useCategoriesStore } from '@/store/categories';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { Loader2 } from 'lucide-react';

interface CategoryListProps {
  viewMode: 'grid' | 'list';
  locale?: string;
}

export const CategoryList: React.FC<CategoryListProps> = ({ viewMode, locale = 'en' }) => {
  const { categories, loading, error, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    fetchCategories(locale as "en" | "ar");
  }, [locale, fetchCategories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <p className="text-red-600 font-bold">{error}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
        <p className="text-slate-600 font-bold">No categories found</p>
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
      : "flex flex-col gap-6"
    }>
      {categories.map((category) => (
        <CategoryCard 
          key={category.id} 
          category={category} 
          viewMode={viewMode}
          locale={locale}
        />
      ))}
    </div>
  );
};
