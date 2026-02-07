"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ProductCard } from '@/components/shop/product-card';
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton';
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";

interface Product {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  rating?: number;
  slug?: string;
}

interface ProductSliderProps {
  products: Product[];
  title?: string;
  className?: string;
}

export function ProductSlider({ products, title, className }: ProductSliderProps) {
  const locale = useLocale() as "en" | "ar";
  return (
    <div className={cn("relative py-12", className)}>
      {title && (
        <div className="flex items-end justify-between items-center mb-10 px-6 md:px-0">
          <div>
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-black uppercase tracking-tighter  relative inline-block z-10">
              {title}
            </h3>
          </div>
          
          <div className="flex gap-3 items-center ">
            <Button>
              <Link
                  href={`/${locale}/products`}
                >
                  View More
              </Link>
            </Button>
            <button className="slider-prev w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-200 dark:border-white/10 hidden sm:flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all active:scale-90 shadow-lg backdrop-blur-sm bg-white/20">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="slider-next w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-200 dark:border-white/10 hidden sm:flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all active:scale-90 shadow-lg backdrop-blur-sm bg-white/20">
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
        loop={products.length > 4}
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
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
          1440: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="!overflow-visible"
      >
        {(() => {
          const display: Product[] = products.length
            ? products
            : Array.from({ length: 5 }).map((_, i) => ({
                id: `s-${i}`,
                title: "",
                price: 0,
                image: undefined,
                rating: 0,
              }));
          return display.map((p) => (
            <SwiperSlide key={p.id} className="h-auto">
              {p.title ? (
                <Link
                  href={`/${locale}/products/${p.slug || p.id}`}
                  className="block h-full"
                  aria-label={p.title ? `View ${p.title}` : "View product"}
                >
                  <ProductCard
                    productId={p.id}
                    key={p.id}
                    title={p.title}
                    price={p.price}
                    image={p.image ?? "/images/a.jpg"}
                    rating={p.rating ?? 4}
                    reviewsCount={0}
                    slug={p.slug}
                  />
                </Link>
              ) : (
                <ProductCardSkeleton viewMode="grid" />
              )}
            </SwiperSlide>
          ));
        })()}
      </Swiper>
    </div>
  );
}
