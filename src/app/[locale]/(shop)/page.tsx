"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/layout/HeroSection";
import { CategoriesSlider } from "@/components/home/categories-slider";
import { useProductsStore } from "@/store/products";
import { ProductSlider } from "@/components/shop/product-slider";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { SecondaryBannerRow } from "@/components/banners/SecondaryBannerRow";
import { ThirdBannerRow } from "@/components/banners/ThirdBannerRow";
import { cn } from "@/utils/utils";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { FeaturesRow } from "@/components/home/FeaturesRow";

export default function HomePage() {
  const { items, fetch } = useProductsStore();
  const t = useTranslations("Home");
  const locale = useLocale() as "en" | "ar";
  useEffect(() => {
    fetch({ page: 1, locale });
  }, [fetch, locale]);

  return (
    <>
      <HeroSection />
      <CategoriesSlider />

      <div className="px-4 md:px-12 space-y-12 pb-12 overflow-hidden bg-background dark:bg-background">
        <SecondaryBannerRow />
        
        <ProductSlider 
          title={t("featuredProducts")} 
          products={items} 
        />
        
        <ThirdBannerRow />
        <NewsletterBanner />
        <FeaturesRow />
      </div>
    </>
  );
}
