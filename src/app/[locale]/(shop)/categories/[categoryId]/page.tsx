"use client";

import React, { useEffect, useState } from 'react';
import { useCategoriesStore } from '@/store/categories';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, LayoutGrid, List, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterSidebar, type FilterGroup } from '@/components/shop/Filter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getFilters } from '@/services/products.service';
import { useProductsStore } from '@/store/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton';
import { useCart } from '@/store/cart';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { cn } from '@/utils/utils';

export default function CategoryProductsPage() {
  const { locale, categoryId } = useParams() as { locale: string; categoryId: string };
  return <CategoryProductsClient locale={locale} categoryId={categoryId} />;
}

const CategoryProductsClient = ({ locale, categoryId }: { locale: string; categoryId: string }) => {
  const { getCategoryProducts, categoryProducts, categoryProductsLoading, error } = useCategoriesStore();
  const { items, loading, fetch, pagination, setPage } = useProductsStore();
  const { addToCart } = useCart();
  const [sort, setSort] = useState<string>('-price');
  const [pageSize, setPageSize] = useState<number>(12);
  const [filterOpen, setFilterOpen] = useState(false);
  const t = useTranslations('Common');

  const [filters, setFilters] = useState<FilterGroup[]>([]);
  const [filtersLoading, setFiltersLoading] = useState(true);

  const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

  const getNestedData = (value: unknown): unknown => {
    if (!isRecord(value)) return value;
    if ("data" in value) return (value as Record<string, unknown>)["data"];
    return value;
  };

  const pickString = (value: unknown): string | undefined => {
    return typeof value === "string" && value.trim() ? value : undefined;
  };

  const pickLocaleLabel = (value: unknown): string | undefined => {
    if (typeof value === "string") return value;
    if (isRecord(value)) {
      const v = value[locale === "ar" ? "ar" : "en"];
      const s = pickString(v);
      if (s) return s;
      return pickString(value["en"]) ?? pickString(value["ar"]);
    }
    return undefined;
  };

  useEffect(() => {
    getCategoryProducts(categoryId, locale as "en" | "ar");
  }, [categoryId, locale, getCategoryProducts]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await getFilters(categoryId);
        const raw = getNestedData(getNestedData(res));
        const rawRecord = isRecord(raw) ? raw : {};
        const nextFilters: FilterGroup[] = [];

        const rawBrands = rawRecord["brands"];
        if (Array.isArray(rawBrands) && rawBrands.length > 0) {
          nextFilters.push({
            id: "brand",
            title: "Brand",
            type: "checkbox",
            options: rawBrands
              .map((b) => (isRecord(b) ? b : null))
              .filter(Boolean)
              .map((b) => ({
                value:
                  pickString(b!["_id"]) ??
                  pickString(b!["id"]) ??
                  pickString(b!["value"]) ??
                  "",
                label:
                  pickLocaleLabel(b!["name"]) ??
                  pickString(b!["label"]) ??
                  pickString(b!["name"]) ??
                  "",
                count: typeof b!["count"] === "number" ? (b!["count"] as number) : undefined,
              }))
              .filter((o) => o.value && o.label),
          });
        }

        const priceRange = rawRecord["priceRange"];
        const minRaw =
          isRecord(priceRange) ? priceRange["min"] : rawRecord["minPrice"];
        const maxRaw =
          isRecord(priceRange) ? priceRange["max"] : rawRecord["maxPrice"];
        const min = typeof minRaw === "number" ? minRaw : Number(minRaw ?? 0);
        const max = typeof maxRaw === "number" ? maxRaw : Number(maxRaw ?? 1000);
        if (Number.isFinite(min) || Number.isFinite(max)) {
          nextFilters.push({
            id: "price",
            title: "Price",
            type: "range",
            min: Number.isFinite(min) ? min : 0,
            max: Number.isFinite(max) ? max : 1000,
          });
        }

        const rawConditions = rawRecord["conditions"];
        if (Array.isArray(rawConditions) && rawConditions.length > 0) {
          nextFilters.push({
            id: "condition",
            title: "Condition",
            type: "tags",
            options: rawConditions
              .map((c) => {
                if (isRecord(c)) {
                  const val = pickString(c["value"]) ?? "";
                  return {
                    value: val,
                    label: val,
                    count: typeof c["count"] === "number" ? (c["count"] as number) : undefined,
                  };
                }
                const val = pickString(c) ?? "";
                return { value: val, label: val };
              })
              .filter((o) => o.value),
          });
        }

        const rawAttributes = rawRecord["attributes"];
        if (isRecord(rawAttributes)) {
          Object.entries(rawAttributes).forEach(([key, values]) => {
            if (!Array.isArray(values) || values.length === 0) return;
            nextFilters.push({
              id: key,
              title: key,
              type: "checkbox",
              options: values
                .map((v) => {
                  if (isRecord(v)) {
                    const val = pickString(v["value"]) ?? String(v["value"] ?? "");
                    return {
                      value: val,
                      label: val,
                      count: typeof v["count"] === "number" ? (v["count"] as number) : undefined,
                    };
                  }
                  const val = pickString(v) ?? String(v ?? "");
                  return { value: val, label: val };
                })
                .filter((o) => o.value && o.label),
            });
          });
        }

        setFilters(nextFilters);
      } catch {
        setFilters([]);
      } finally {
        setFiltersLoading(false);
      }
    };
    loadFilters();
  }, [locale, categoryId]);

  useEffect(() => {
    fetch({ locale: locale as "en" | "ar", category: categoryId, page: 1, pageSize, filters: { sort } });
  }, [locale, categoryId, fetch, sort, pageSize]);

  const handleAddToCart = async (productId: string | number) => {
    const success = await addToCart(String(productId), 1);
    if (success) {
      toast.success(locale === "ar" ? "تمت الإضافة إلى السلة" : "Added to cart!");
    } else {
      toast.error(locale === "ar" ? "فشل الإضافة إلى السلة" : "Failed to add to cart");
    }
  };

  const handleFilterChange = (newFilters: Record<string, string[] | number>) => {
    const mapped: Record<string, string | number> = {};
    Object.entries(newFilters).forEach(([key, value]) => {
      if (key === 'price' && typeof value === 'number') {
        const priceGroup = filters.find((f) => f.id === 'price');
        const min = typeof priceGroup?.min === 'number' ? priceGroup!.min : 0;
        mapped['minPrice'] = min;
        mapped['maxPrice'] = value;
      } else if (Array.isArray(value)) {
        mapped[key] = value.join(',');
      } else {
        mapped[key] = value;
      }
    });
    mapped['sort'] = sort;
    fetch({ locale: locale as "en" | "ar", category: categoryId, filters: mapped, page: 1, pageSize });
  };

  const handleLoadMore = async () => {
    if (pagination.page < pagination.totalPages) {
      await setPage(pagination.page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-background text-slate-900 dark:text-foreground font-sans antialiased">
      <div className="max-w-[1600px] mx-auto px-2 sm:pt-9">
        
        {/* CATEGORY HEADER */}
        {categoryProductsLoading ? (
          <div className="bg-white dark:bg-card rounded-2xl p-3 mb-10 border border-slate-200 dark:border-border shadow-sm flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600 dark:text-primary" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mb-10">
            <p className="text-red-600 font-bold text-lg">{error}</p>
          </div>
        ) : categoryProducts ? (
          <div className="bg-white dark:bg-card rounded-2xl p-3 mb-10 border border-slate-200 dark:border-border shadow-sm">
            <div className="flex items-center gap-6">
              {categoryProducts.category.image && (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-muted shrink-0">
                  <Image 
                    src={categoryProducts.category.image} 
                    alt={categoryProducts.category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-sm md:text-4xl font-black uppercase italic tracking-tighter text-slate-950 dark:text-foreground mb-2">
                  {categoryProducts.category.name}
                </h1>
                <p className="text-slate-400 dark:text-muted-foreground font-bold flex gap-2 text-sm">
                  <span>{t("productsAvailable")} : </span> <span>{pagination.total}</span> 
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col relative lg:flex-row gap-10">
          <aside className="hidden lg:block lg:w-[280px] shrink-0 space-y-10">
            {filtersLoading ? (
              <FilterSidebar isLoading={true} />
            ) : (
              <FilterSidebar 
                key={filters.map((f) => f.id).join("|")}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            )}
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between gap-3 w-full sm:w-auto mb-2 px-3">
              <div className="flex items-center border border-slate-200 dark:border-border rounded-lg overflow-hidden bg-white dark:bg-card shadow-sm">
                <button 
                  className="p-2.5 transition-all bg-[#0F172A] dark:bg-primary text-white"
                  disabled
                >
                  <LayoutGrid size={18}/>
                </button>
                <button 
                  className="p-2.5 transition-all border-l border-slate-200 dark:border-border text-slate-400 dark:text-muted-foreground"
                  disabled
                >
                  <List size={18}/>
                </button>
              </div>
              <Button 
                onClick={() => setFilterOpen(true)} 
                className="lg:hidden h-10 px-4 rounded-lg bg-red-600 dark:bg-primary text-white text-xs font-black uppercase tracking-widest"
              >
                {t("filter")}
              </Button>
            </div>

            {loading && items.length === 0 ? (
              <div className="bg-white dark:bg-card rounded-[2rem] border border-slate-200 dark:border-border px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <RefreshCcw className="w-4 h-4 animate-spin text-red-600 dark:text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-muted-foreground">
                        Fetching_Categories
                      </p>
                      <p className="text-xs text-slate-400 dark:text-muted-foreground">
                        Loading category products and filters
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Live inventory sync</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 gap-y-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} viewMode="grid" />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 gap-y-4">
                  {items.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode="grid"
                      locale={locale}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>

                {pagination.page < pagination.totalPages && (
                  <div className="mt-12 p-1 bg-[#0F172A] dark:bg-card rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="bg-white dark:bg-muted rounded-[2.4rem] p-12 text-center relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-600 dark:bg-primary rounded-b-full shadow-[0_4px_10px_rgba(220,38,38,0.3)]" />
                      
                      <div className="flex flex-col items-center gap-6">
                        <div className="space-y-1">
                          <h4 className="text-[11px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.3em]">
                            Registry_Sync_Status
                          </h4>
                          <p className="text-sm font-bold text-[#0F172A] dark:text-foreground">
                            Displayed: {items.length} <span className="text-slate-300">/</span> Total: {pagination.total}
                          </p>
                        </div>

                        <Button 
                          onClick={handleLoadMore}
                          disabled={loading}
                          className="h-16 px-16 rounded-2xl bg-[#0F172A] dark:bg-primary text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-red-600 dark:hover:bg-red-700 hover:shadow-[0_20px_40px_-12px_rgba(220,38,38,0.4)] transition-all flex gap-4 active:scale-95 disabled:opacity-50"
                        >
                          {loading ? <RefreshCcw size={18} className="animate-spin" /> : "Load More"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
          <DialogContent
            rounded="none"
            className={cn(
              /* Remove centering from base */
              "fixed inset-y-0 z-50 w-[85vw] max-w-[420px] bg-white dark:bg-card",
              "p-6 border-none shadow-2xl",
              "transition-all duration-1000 ease-out",
              "data-[state=open]:translate-x-0",
              "data-[state=closed]:opacity-0",

              locale !== "ar"
                ? "left-0 data-[state=closed]:-translate-x-full -translate-y-0 top-0"
                : "right-0 data-[state=closed]:translate-x-full -translate-y-0 top-0"
            )}
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-black uppercase tracking-widest">Filters</DialogTitle>
            </DialogHeader>
            <div className="max-h-[80vh] overflow-y-auto pr-2">
              {filtersLoading ? (
                <FilterSidebar isLoading={true} />
              ) : (
                <FilterSidebar 
                  key={filters.map((f) => f.id).join("|")}
                  filters={filters}
                  onFilterChange={(f) => {
                    handleFilterChange(f);
                  }}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
