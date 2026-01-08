"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ProductCard } from "@/components/shop/product-card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { cn } from "@/lib/utils";

interface Product {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  rating?: number;
}

interface ProductSliderProps {
  products: Product[];
  title?: string;
  className?: string;
}

export function ProductSlider({ products, title, className }: ProductSliderProps) {
  return (
    <div className={cn("relative py-12", className)}>
      {title && (
        <div className="flex items-end justify-between mb-10 px-6 md:px-0">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter italic relative inline-block z-10">
              {title}
              <span className="absolute left-0 bottom-1 w-full h-3 bg-red-600/20 -z-10 skew-x-12"></span>
            </h3>
          </div>
          
          <div className="flex gap-3">
            <button className="slider-prev w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all active:scale-90 shadow-lg backdrop-blur-sm bg-white/20">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="slider-next w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all active:scale-90 shadow-lg backdrop-blur-sm bg-white/20">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        centeredSlides={false}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: '.slider-prev',
          nextEl: '.slider-next',
        }}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="!overflow-visible"
      >
        {(products.length ? products : Array.from({ length: 5 }).map((_, i) => ({ id: `s-${i}` })) as any[]).map((p: any) => (
          <SwiperSlide key={p.id} className="h-auto">
            {"title" in p ? (
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
            ) : (
              <div className="rounded-[2rem] bg-neutral-100 animate-pulse h-[320px] sm:h-[420px]" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
