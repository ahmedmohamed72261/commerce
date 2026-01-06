
 "use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/layout/hero.section";
import { CategoriesSlider } from "@/components/home/categories-slider";
import { useProductsStore } from "@/store/products";
import { ProductSlider } from "@/components/shop/product-slider";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const { items, pagination, fetch, setPage, loading } = useProductsStore();
  const t = useTranslations("Home");
  const fallback = [
    { id: 1, title: "Gaming Laptop Pro X", price: 1250.0, image: "/images/a.jpg", rating: 5 },
    { id: 2, title: "Ultrabook Air 14", price: 999.0, image: "/images/b.jpg", rating: 4 },
    { id: 3, title: "Creator Studio 16", price: 1499.0, image: "/images/c.jpg", rating: 5 },
    { id: 4, title: "Wireless Earbuds", price: 120.0, image: "/images/j.jpg", rating: 4 },
    { id: 5, title: "Gaming Mouse", price: 80.0, image: "/images/k.jpg", rating: 5 },
    { id: 6, title: "Mechanical Keyboard", price: 150.0, image: "/images/l.jpg", rating: 5 },
  ];

  useEffect(() => {
    fetch({ page: 1 });
  }, [fetch]);

  return (
    <>
      <HeroSection />
      <CategoriesSlider />

      <div className="container mx-auto sm:px-8 md:px-12 py-12 space-y-12 overflow-hidden">
        <ProductSlider 
          title={t("featuredProducts")} 
          products={items.length ? items : fallback} 
        />
      </div>
    </>
  );
}
