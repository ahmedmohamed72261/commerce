"use client";

import { use, useEffect } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ReusableSidebar, type FilterGroup } from "@/components/shop/reusable-sidebar";
import { ProductCard } from "@/components/shop/product-card";
import { Pagination } from "@/components/shop/pagination";
import { useProductsStore } from "@/store/products";

const getFiltersForCategory = (category: string): FilterGroup[] => {
  const common: FilterGroup[] = [
    { id: "price", title: "Price Range", type: "range", min: 0, max: 2000 },
    {
      id: "brand",
      title: "Brands",
      type: "checkbox",
      options: [
        { label: "Samsung", value: "samsung", count: 12 },
        { label: "Apple", value: "apple", count: 8 },
        { label: "Sony", value: "sony", count: 5 },
        { label: "Dell", value: "dell", count: 4 },
      ],
    },
  ];
  if (category === "laptops" || category === "desktops") {
    return [
      ...common,
      { id: "processor", title: "Processor", type: "checkbox", options: [{ label: "Intel i9", value: "i9" }, { label: "Intel i7", value: "i7" }, { label: "Ryzen 9", value: "r9" }, { label: "Apple M2", value: "m2" }] },
      { id: "ram", title: "RAM", type: "tags", options: [{ label: "8GB", value: "8gb" }, { label: "16GB", value: "16gb" }, { label: "32GB", value: "32gb" }, { label: "64GB", value: "64gb" }] },
    ];
  }
  if (category === "phones" || category === "tablets") {
    return [
      ...common,
      { id: "storage", title: "Storage", type: "tags", options: [{ label: "64GB", value: "64gb" }, { label: "128GB", value: "128gb" }, { label: "256GB", value: "256gb" }, { label: "512GB", value: "512gb" }] },
      { id: "features", title: "Features", type: "checkbox", options: [{ label: "5G", value: "5g" }, { label: "NFC", value: "nfc" }, { label: "Wireless Charging", value: "wireless_charging" }] },
    ];
  }
  return common;
};

export default function CategoryProductsPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = use(params);
  const filters = getFiltersForCategory(category);
  const decodedCategory = decodeURIComponent(category);
  const title = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
  const { items, pagination, fetch, setPage, loading } = useProductsStore();

  useEffect(() => {
    fetch({ category: decodedCategory, page: 1 });
  }, [decodedCategory, fetch]);

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumb items={[{ label: "Home", href: `/${locale}` }, { label: "Categories", href: `/${locale}/categories` }, { label: title, href: `/${locale}/categories/${decodedCategory}` }, { label: "Products" }]} />
      <div className="container mx-auto px-4 sm:px-8 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="hidden lg:block lg:col-span-3">
            <ReusableSidebar filters={filters} />
          </div>
          <div className="col-span-1 lg:col-span-9">
            <div className="flex items-center justify-between mb-8 bg-card p-4 rounded-lg border border-border">
              <p className="text-muted-foreground">Showing {(items.length ? 1 : 0)}-{items.length} of {pagination.total} results</p>
              <select className="bg-transparent border-none text-foreground font-medium focus:ring-0 cursor-pointer">
                <option>Sort by: Popularity</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Price: Low to High</option>
                <option>Sort by: Price: High to Low</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <ProductCard
                  key={p.id}
                  title={p.title}
                  price={p.price}
                  salePrice={p.salePrice}
                  image={p.image ?? "/images/a.jpg"}
                  rating={p.rating ?? 4}
                  category={p.category}
                  brand={p.brand}
                  stock={p.stock}
                  condition={p.condition}
                />
              ))}
            </div>
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(p) => setPage(p)}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
