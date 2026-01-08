"use client";

import { useTranslations } from "next-intl";
import { BannerSlider } from "@/components/hero/banner-slider";
import { Button } from "@/components/ui/button";
import { BannerCard } from "@/components/hero/banner-card";
import { Play, Shield, Globe, Award, MoveRight, ArrowLeft, ArrowRight } from "lucide-react";
import { AboutSectionHero } from "./AboutSectionHero";
import { useEffect } from "react";
import { useBrandsStore } from "@/store/brands";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export function HeroSection() {
  const t = useTranslations("Home");
  const brandRed = "#C40000";
  const { brands, fetchBrands, loading: brandsLoading } = useBrandsStore();
  const locale = useLocale() as "en" | "ar";

  useEffect(() => {
    fetchBrands(locale);
  }, [fetchBrands, locale]);

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
    <section className="relative pt-0 px-4 pb-5 overflow-visible bg-background dark:bg-background">
      {/* 1. Main Hero Slider */}
      <div className="w-full relative">
        <BannerSlider
          images={sliderImages}
          interval={6000}
          className="rounded-none shadow-none"
          heightClass="h-[360px] md:h-[600px] lg:h-[850px]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center w-full">
            <div className="container mx-auto px-4 md:px-12">
              <div className="max-w-2xl text-white">
                <div className="flex items-center gap-3 mb-4 animate-fade-down opacity-0 [animation-fill-mode:forwards]">
                  <div className="h-px w-10 bg-red-600" />
                  <span className="uppercase tracking-[0.4em] text-xs font-bold text-red-500">Premium Tech Solutions</span>
                </div>
                <h1 className="text-3xl md:text-7xl font-black drop-shadow-md leading-[0.9] uppercase tracking-tighter animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                  {t("heroTitle")}
                </h1>
                <p className="mt-6 text-md md:text-xl text-white/80 leading-relaxed max-w-lg animate-fade-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                  {t("heroDesc")}
                </p>
                <div className="my-10 flex gap-4 animate-fade-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
                  <Button className="bg-[#C40000] hover:bg-white hover:text-black text-white px-10 py-7 md:text-lg text-md font-black uppercase tracking-widest rounded-none transition-all duration-300 shadow-2xl">
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
  <div className="px-4 pt-10">
    <div className="flex items-center justify-between mb-10">
       <div>
         <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{t("featuredBrands")}</h2>
         <div className="h-1 w-20 bg-[#C40000] mt-2" />
       </div>
           
           <div className="flex gap-2">
            <button className="brands-prev w-10 h-10 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
              <ArrowLeft size={20} />
            </button>
            <button className="brands-next w-10 h-10 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={2}
              loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: '.brands-prev',
                nextEl: '.brands-next',
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="px-1 py-4"
            >
              {((brandsLoading ? Array.from({ length: 5 }).map((_, i) => ({ _id: `s-${i}` })) : (brands.length ? brands : []) ) as any[]).map((b) => (
                <SwiperSlide key={b._id}>
                  {('name' in b) ? (
                    <BannerCard
                      variant={15}
                      image={(b as any).image ?? "/images/f.jpg"}
                      title={(b as any).name}
                      count={t("brand")}
                      href="#"
                    />
                  ) : (
                    <div className="h-[180px] md:h-[220px] rounded-3xl bg-neutral-100 animate-pulse" />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
    </section>
  );
}
