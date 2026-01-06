"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useCategoriesStore, type Category } from "@/store/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      className="relative h-[340px] sm:h-[380px] md:h-[460px] w-full overflow-hidden rounded-[3.5rem] cursor-pointer bg-black group"
    >
      {/* IMAGE LAYER: Fixed 'scale' not working by using motion variants */}
      <motion.img
        variants={{
          initial: { scale: 1, filter: "grayscale(20%)" },
          hover: { scale: 1.12, filter: "grayscale(0%)" }
        }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        src={cat.image}
        alt={cat.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      {/* GRADIENT SCRIM: Darkens on hover to make text pop */}
      <motion.div 
        variants={{
          initial: { opacity: 0.6 },
          hover: { opacity: 0.85 }
        }}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"
      />

      {/* TEXT CONTENT */}
      <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
        <div className="space-y-4">
          <motion.div
            variants={{
              initial: { x: 0 },
              hover: { x: 10 }
            }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[--color-primary] font-extrabold text-md tracking-[0.5em] uppercase mb-2">
              {cat.tag}
            </p>
            <h3 className="text-4xl md:text-4xl font-black tracking-tighter text-white leading-[0.9] dark:text-[--color-primary]">
              {cat.name}
            </h3>
          </motion.div>

          {/* Animated Line Under Title */}
          <motion.div 
            variants={{
              initial: { width: "0%" },
              hover: { width: "100%" }
            }}
            className="h-2 bg-red-800 rounded-full overflow-hidden"
          >
             <div className="h-full bg-[--color-primary] w-full" />
          </motion.div>
        </div>
      </div>

      {/* FLOATING PRODUCT COUNT */}
      <div className="absolute top-10 left-10 rtl:left-auto rtl:right-10 z-20">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 px-6 py-2 rounded-full">
          <span className="text-[16px] font-black uppercase tracking-widest text-white/90">
            {cat.count} PIECES
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function CategoriesSlider() {
  const { categories, fetchCategories, loading } = useCategoriesStore();
  const t = useTranslations("Home");
  const data = categories;
  const length = data.length;
  const [index, setIndex] = useState(0);
  const locale = useLocale();
  const isRtl = locale === "ar";
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="py-24 bg-[--color-background] overflow-hidden">
      <div className=" mx-auto px-6 md:px-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-4xl font-black tracking-tighter text-[--color-foreground] leading-none uppercase">
              {t("categoriesTitle")}
            </h2>
          </div>

        <div className="flex gap-4">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="h-20 w-20 rounded-full border border-[--color-border] flex items-center justify-center hover:bg-[--color-foreground] hover:text-[--color-background] transition-all active:scale-90"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="h-20 w-20 rounded-full border border-[--color-border] flex items-center justify-center hover:bg-[--color-foreground] hover:text-[--color-background] transition-all active:scale-90"
          >
            <ChevronRight size={32} />
          </button>
        </div>
        </div>

        {/* SWIPER VIEWPORT */}
        <div dir={isRtl ? "rtl" : "ltr"}>
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(sw) => (swiperRef.current = sw)}
            onSlideChange={(sw) => setIndex(sw.realIndex)}
            spaceBetween={24}
            slidesPerView={1}
            loop
            speed={700}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={false}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {data.map((cat) => (
              <SwiperSlide key={(cat.key ?? cat.id) as React.Key}>
                <Link href={`/${locale}/categories/${encodeURIComponent((cat as Category).key ?? String(cat.id))}`}>
                  <CategoryCard cat={cat} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
