
 "use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/layout/HeroSection";
import { CategoriesSlider } from "@/components/home/categories-slider";
import { useProductsStore } from "@/store/products";
import { ProductSlider } from "@/components/shop/product-slider";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { BannerSlider } from "@/components/hero/banner-slider";
import { getBannersByType } from "@/services/banners.service";
import React, { useState } from "react";

export default function HomePage() {
  const { items, pagination, fetch, setPage, loading } = useProductsStore();
  const t = useTranslations("Home");
  const locale = useLocale() as "en" | "ar";
  const [mainBanners, setMainBanners] = useState<string[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<string[]>([]);

  useEffect(() => {
    fetch({ page: 1, locale });
    (async () => {
      try {
        const main = await getBannersByType("main");
        const sec = await getBannersByType("secondary");
        const mainImgs = main.flatMap((b: any) => Array.isArray(b.images) ? b.images : []);
        const secImgs = sec.flatMap((b: any) => Array.isArray(b.images) ? b.images : []);
        setMainBanners(mainImgs);
        setSecondaryBanners(secImgs);
      } catch {}
    })();
  }, [fetch, locale]);

  return (
    <>
      <HeroSection />
      <CategoriesSlider />

      <div className=" mx-auto sm:px-8 md:px-12  space-y-12 overflow-hidden bg-background dark:bg-background">
        {mainBanners.length > 0 && (
          <BannerSlider
            images={mainBanners}
            interval={6000}
            className="rounded-xl"
            heightClass="h-[220px] md:h-[320px]"
          />
        )}
        {secondaryBanners.length > 0 && (
          <BannerSlider
            images={secondaryBanners}
            interval={6000}
            className="rounded-xl"
            heightClass="h-[180px] md:h-[260px]"
          />
        )}
        <ProductSlider 
          title={t("featuredProducts")} 
          products={items} 
        />
      </div>
    </>
  );
}
