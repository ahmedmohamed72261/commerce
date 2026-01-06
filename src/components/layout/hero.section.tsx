"use client";

import { useTranslations } from "next-intl";
import { BannerSlider } from "@/components/hero/banner-slider";
import { Button } from "@/components/ui/button";
import { BannerCard } from "@/components/hero/banner-card";
import { Play, Shield, Globe, Award, MoveRight } from "lucide-react";
import { AboutSectionHero } from "./AboutSectionHero";
import { useEffect } from "react";
import { useBrandsStore } from "@/store/brands";

export function HeroSection() {
  const t = useTranslations("Home");
  const brandRed = "#C40000";
  const { brands, fetchBrands } = useBrandsStore();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const sliderImages = [
    "/images/banners2/a.jpg",
    "/images/banners2/b.jpg",
    "/images/banners2/c.jpg",
    "/images/banners2/d.jpg",
    "/images/banners2/e.jpg",
    "/images/banners2/f.jpg",
  ];

  // Brands are fetched via store and mapped into cards below

  return (
    <section className="relative pt-0 pb-20 overflow-visible bg-background dark:bg-background">
      {/* 1. Main Hero Slider */}
      <div className="w-full relative">
        <BannerSlider
          images={sliderImages}
          interval={6000}
          className="rounded-none shadow-none"
          heightClass="h-[600px] lg:h-[850px]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center w-full">
            <div className="container mx-auto px-4 md:px-12">
              <div className="max-w-2xl text-white">
                <div className="flex items-center gap-3 mb-4 animate-fade-down opacity-0 [animation-fill-mode:forwards]">
                  <div className="h-px w-10 bg-red-600" />
                  <span className="uppercase tracking-[0.4em] text-xs font-bold text-red-500">Premium Tech Solutions</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black drop-shadow-md leading-[0.9] uppercase tracking-tighter animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                  {t("heroTitle")}
                </h1>
                <p className="mt-6 text-xl text-white/80 leading-relaxed max-w-lg animate-fade-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                  {t("heroDesc")}
                </p>
                <div className="mt-10 flex gap-4 animate-fade-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
                  <Button className="bg-[#C40000] hover:bg-white hover:text-black text-white px-10 py-7 text-lg font-black uppercase tracking-widest rounded-none transition-all duration-300 shadow-2xl">
                    {t("ctaShop")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </BannerSlider>
      </div>

      <AboutSectionHero />

      {/* 3. Featured Brands */}
      <div className="container mx-auto px-4 pt-20">
        <div className="flex items-center justify-between mb-10">
           <div>
             <h2 className="text-3xl font-black uppercase tracking-tighter">Featured Brands</h2>
             <div className="h-1 w-20 bg-[#C40000] mt-2" />
           </div>
           <button className="flex items-center gap-2 text-[#C40000] font-black uppercase text-xs tracking-[0.2em] hover:gap-4 transition-all">
              See All Products <MoveRight size={16} />
           </button>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {(brands.length ? brands : []).slice(0, 12).map((b) => (
            <BannerCard
              key={b._id}
              variant={15}
              image={b.image ?? "/images/f.jpg"}
              title={b.name}
              count="Brand"
              href="#"
            />
          ))}
          </div>
        </div>
    </section>
  );
}
