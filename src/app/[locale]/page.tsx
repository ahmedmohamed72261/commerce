
 "use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/layout/hero.section";
import { CategoriesSlider } from "@/components/home/categories-slider";
import { useProductsStore } from "@/store/products";
import { ProductSlider } from "@/components/shop/product-slider";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function HomePage() {
  const { items, pagination, fetch, setPage, loading } = useProductsStore();
  const t = useTranslations("Home");
  const locale = useLocale() as "en" | "ar";

  useEffect(() => {
    fetch({ page: 1, locale });
  }, [fetch, locale]);

  return (
    <>
      <HeroSection />
      <CategoriesSlider />

      <div className=" mx-auto sm:px-8 md:px-12  space-y-12 overflow-hidden">
        <ProductSlider 
          title={t("featuredProducts")} 
          products={items} 
        />
      </div>
    </>
  );
}
