"use client";

import React, { useState } from 'react';
import { ChevronRight, LayoutGrid, List, Cpu } from 'lucide-react';
import { CategoryList } from '@/components/categories/CategoryList';
import { useParams } from 'next/navigation';
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Breadcrumb } from '@/components/ui/breadcrumb';
export default function CategoriesPage() {
  const { locale } = useParams() as { locale: string };
  return <CategoriesPageClient locale={locale} />;
}

const CategoriesPageClient = ({ locale }: { locale: string }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const t = useTranslations('Common');

  return (
    <div className="min-h-screen bg-[#F6F6F7] dark:bg-background text-slate-900 dark:text-foreground font-sans antialiased selection:bg-red-100 selection:text-red-600">
      
      {/* Unified Breadcrumb */}
      <Breadcrumb
        items={[
          { label: t('categories') }
        ]}
      />

      <main className="px-3 py-3">
        <header className="mb-2 flex flex-row justify-between items-center px-3 gap-6">
          <div className="space-y-4">
            <h1 className="md:text-2xl text-xl flex items-center gap-2 rtl:flex-row-reverse font-black uppercase  tracking-tighter leading-none text-slate-950 dark:text-foreground">
              {t('categories')} <span className="text-red-600 dark:text-primary drop-shadow-sm">{t('list')}</span>
            </h1>
          </div>
          <div className="flex items-center bg-slate-100 dark:bg-muted p-1 rounded-xl border border-slate-200 dark:border-border shadow-inner">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white dark:bg-card text-red-600 dark:text-primary shadow-md ring-1 ring-black/5 dark:ring-white/5' : 'text-slate-400 dark:text-muted-foreground hover:text-slate-600 dark:hover:text-foreground'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white dark:bg-card text-red-600 dark:text-primary shadow-md ring-1 ring-black/5 dark:ring-white/5' : 'text-slate-400 dark:text-muted-foreground hover:text-slate-600 dark:hover:text-foreground'}`}
            >
              <List size={18} />
            </button>
          </div>
        </header>

        <CategoryList viewMode={viewMode} locale={locale} />
      </main>
    </div>
  );
};
